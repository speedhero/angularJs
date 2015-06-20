package com.yejq.base.impl;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.BeanInitializationException;
import org.springframework.beans.factory.InitializingBean;

import com.yejq.base.BaseMapper;
import com.yejq.base.BaseService;
import com.yejq.util.BaseUtils;

public abstract class BaseServiceImpl<T> implements BaseService<T>, InitializingBean {

	protected BaseMapper<T> mapper = null;

	public Class<T> entityClass;

	protected final transient Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 在构造函数中将泛型T.class赋给entityClass.
	 */
	@SuppressWarnings("unchecked")
	public BaseServiceImpl() {
		entityClass = BaseUtils.getSuperClassGenricType(getClass());
	}

	public final void afterPropertiesSet() throws IllegalArgumentException, BeanInitializationException {
		initMapper();
		if (mapper == null) {
			logger.error("Base mapper is not set. Please set it in the initManager method if database access is desired!");
		}
	}

	/**
	 * 子类需要重载这个方法来实现初始化，包括设置mapper
	 * 
	 */
	protected abstract void initMapper();

	@Override
	public int save(T t) {
		return mapper.save(t);
	}

	@Override
	public int update(T t) {
		return mapper.update(t);
	}

	@Override
	public T get(Serializable id) {
		return mapper.get(id);
	}

	@Override
	public int saveBatch(List<T> ts) {
		return mapper.saveBatch(ts);
	}
	
	@Override
	public HashMap<String, Object> customSelect(String outColumns, String keyColumn, Object keyValue){
		return mapper.customSelect(outColumns, keyColumn, keyValue);
	}

}
