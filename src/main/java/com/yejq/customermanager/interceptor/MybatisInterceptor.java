package com.yejq.customermanager.interceptor;

import java.text.DateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Properties;

import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.session.Configuration;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.apache.ibatis.type.TypeHandlerRegistry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.yejq.util.BaseUtils;

/**
 * 执行SQL日志拦截器
 * @author yejq
 */
@Intercepts({
		@Signature(type = Executor.class, method = "update", args = { MappedStatement.class, Object.class }),
		@Signature(type = Executor.class, method = "query", args = { MappedStatement.class, Object.class, RowBounds.class,
				ResultHandler.class }) })
public class MybatisInterceptor implements Interceptor {

	private Logger logger = LoggerFactory.getLogger(getClass());
	private Properties properties;

	public Object intercept(Invocation invocation) throws Throwable {
		MappedStatement mappedStatement = (MappedStatement) invocation.getArgs()[0];
		
		Object parameter = null;
		if (invocation.getArgs().length > 1) {
			parameter = invocation.getArgs()[1];
		}
		
		String sqlId = mappedStatement.getId();
		BoundSql boundSql = mappedStatement.getBoundSql(parameter);
		Configuration configuration = mappedStatement.getConfiguration();
		
		long start = System.currentTimeMillis();
		Object returnValue = null;
		try {
			returnValue = invocation.proceed();
		} catch (Exception e) {
			throw e;
		} finally {
			// 过滤不记录
			String ignoreSqlId_endsWith = properties.getProperty("ignoreSqlId_endsWith");
			if (ignoreSqlId_endsWith != null) {
				String[] ignoreSqlId_endsWiths = ignoreSqlId_endsWith.split(",");
				boolean match = false;
				for (String ignoreSqlId : ignoreSqlId_endsWiths) {
					if (sqlId.endsWith(ignoreSqlId)) {
						match = true;
						break;
					}
				}
				if (match) {
					return returnValue;
				}
			}

			long end = System.currentTimeMillis();
			long time = (end - start);

			String sql = getSql(configuration, boundSql, sqlId, time);
			logger.debug(sql);
		}

		return returnValue;
	}

	public static String getSql(Configuration configuration, BoundSql boundSql, String sqlId, long time) {
		String sql = showSql(configuration, boundSql);
		StringBuilder str = new StringBuilder(100);
		str.append(sql);
		str.append(BaseUtils.lineSeparator);
		str.append(sqlId);
		str.append(BaseUtils.lineSeparator);
		str.append(time);
		str.append("ms");
		return str.toString();
	}

	private static String getParameterValue(Object obj) {
		String value = null;
		if (obj instanceof String) {
			value = "'" + obj.toString() + "'";
		} else if (obj instanceof Date) {
			DateFormat formatter = DateFormat.getDateTimeInstance(DateFormat.DEFAULT, DateFormat.DEFAULT, Locale.CHINA);
			value = "'" + formatter.format(obj) + "'";
		} else {
			if (obj != null) {
				value = obj.toString();
			} else {
				value = "";
			}

		}
		return value;
	}

	public static String showSql(Configuration configuration, BoundSql boundSql) {
		Object parameterObject = boundSql.getParameterObject();
		List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
		String sql = boundSql.getSql().replaceAll("[\\s]+", " ");
		try {
			if (parameterMappings.size() > 0 && parameterObject != null) {
				TypeHandlerRegistry typeHandlerRegistry = configuration.getTypeHandlerRegistry();
				if (typeHandlerRegistry.hasTypeHandler(parameterObject.getClass())) {
					sql = sql.replaceFirst("\\?", getParameterValue(parameterObject));

				} else {
					MetaObject metaObject = configuration.newMetaObject(parameterObject);
					for (ParameterMapping parameterMapping : parameterMappings) {
						String propertyName = parameterMapping.getProperty();
						if (metaObject.hasGetter(propertyName)) {
							Object obj = metaObject.getValue(propertyName);
							sql = sql.replaceFirst("\\?", getParameterValue(obj));
						} else if (boundSql.hasAdditionalParameter(propertyName)) {
							Object obj = boundSql.getAdditionalParameter(propertyName);
							sql = sql.replaceFirst("\\?", getParameterValue(obj));
						}
					}
				}
			}
		} catch (Exception e) {
			//e.printStackTrace();
		}
		return sql;
	}

	public Object plugin(Object target) {
		return Plugin.wrap(target, this);
	}

	public void setProperties(Properties properties0) {
		this.properties = properties0;
	}

}
