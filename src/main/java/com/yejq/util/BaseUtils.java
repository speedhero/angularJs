package com.yejq.util;

import java.beans.PropertyDescriptor;
import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ResourceBundle;
import java.util.UUID;
import java.util.Vector;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Generics的util类.
 * 
 * @author yejq
 */
public class BaseUtils {
	private static final Logger log = LoggerFactory.getLogger(BaseUtils.class);
	public static final String lineSeparator = System.getProperty("line.separator");

	/**
	 * 通过反射,获得定义Class时声明的父类的范型参数的类型. 如public BookManager extends
	 * GenricManager<Book>
	 * 
	 * @param clazz
	 *            The class to introspect
	 * @return the first generic declaration, or <code>Object.class</code> if
	 *         cannot be determined
	 */
	@SuppressWarnings("rawtypes")
	public static Class getSuperClassGenricType(Class clazz) {
		return getSuperClassGenricType(clazz, 0);
	}

	/**
	 * 通过反射,获得定义Class时声明的父类的范型参数的类型. 如public BookManager extends
	 * GenricManager<Book>
	 * 
	 * @param clazz
	 *            clazz The class to introspect
	 * @param index
	 *            the Index of the generic ddeclaration,start from 0.
	 * @return the index generic declaration, or <code>Object.class</code> if
	 *         cannot be determined
	 */
	@SuppressWarnings("rawtypes")
	public static Class getSuperClassGenricType(Class clazz, int index) {

		Type genType = clazz.getGenericSuperclass();

		if (!(genType instanceof ParameterizedType)) {
			log.warn(clazz.getSimpleName() + "'s superclass not ParameterizedType");
			return Object.class;
		}

		Type[] params = ((ParameterizedType) genType).getActualTypeArguments();

		if (index >= params.length || index < 0) {
			log.warn("Index: " + index + ", Size of " + clazz.getSimpleName() + "'s Parameterized Type: "
					+ params.length);
			return Object.class;
		}
		if (!(params[index] instanceof Class)) {
			log.warn(clazz.getSimpleName() + " not set the actual class on superclass generic parameter");
			return Object.class;
		}
		return (Class) params[index];
	}

	private BaseUtils() {
	}

	/**
	 * 判断是否基本类型，基本类型与对应的包装类
	 * 
	 * @param
	 * @return boolean
	 * @throws
	 */
	@SuppressWarnings("rawtypes")
	public static boolean isWrapClass(Class clz) {
		try {
			return ((Class) clz.getField("TYPE").get(null)).isPrimitive();
		} catch (Exception e) {
			return false;
		}
	}

	// 获取报错堆栈串
	public static String getStackTraceString(Throwable e) {
		String stackTraceString = "";
		if (e != null) {
			ByteArrayOutputStream buf = new ByteArrayOutputStream();
			e.printStackTrace(new PrintWriter(buf, true));
			stackTraceString = buf.toString();
			buf = null;
		}
		return stackTraceString;
	}

	// 配置文件路径：spring/placeholder.properties
	public static final ResourceBundle conf = ResourceBundle.getBundle("spring.placeholder");

	public static String getPropertyString(String key) {
		try {
			return conf.getString(key);
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return "";
	}

	/**
	 * 调试, 打印出给定 Bean 的所有属性的取值.
	 * 
	 * @param bean
	 *            需要调试的对象
	 */
	public static String dump(Object bean) {
		return JSonUtils.toJSon(bean);
	}

	/**
	 * 包含List对象的输出
	 * 
	 * @param
	 * @return String
	 * @throws
	 */
	public static String dumpAll(Object object) {
		return JSonUtils.toJSon(object);
	}

	/**
	 * 从 bean 中读取有效的属性描述符. NOTE: 名称为 class 的 PropertyDescriptor 被排除在外.
	 * 
	 * @param bean
	 *            Object - 需要读取的 Bean
	 * @return PropertyDescriptor[] - 属性列表
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static java.beans.PropertyDescriptor[] getAvailablePropertyDescriptors(Object bean) {
		try {
			// 从 Bean 中解析属性信息并查找相关的 write 方法
			java.beans.BeanInfo info = java.beans.Introspector.getBeanInfo(bean.getClass());
			if (info != null) {
				java.beans.PropertyDescriptor pd[] = info.getPropertyDescriptors();
				Vector columns = new Vector();

				for (int i = 0; i < pd.length; i++) {
					String fieldName = pd[i].getName();

					if (fieldName != null && !fieldName.equals("class")) {
						columns.add(pd[i]);
					}
				}

				java.beans.PropertyDescriptor[] arrays = new java.beans.PropertyDescriptor[columns.size()];

				for (int j = 0; j < columns.size(); j++) {
					arrays[j] = (PropertyDescriptor) columns.get(j);
				}

				return arrays;
			}
		} catch (Exception ex) {
			System.out.println(ex);
			return null;
		}
		return null;
	}

	/**
	 * long转Integer
	 * 
	 * @param l
	 */
	public static Integer toInteger(long l) {
		return Long.valueOf(l).intValue();
	}
	
	public static Long toLong(int i){
		return new Long((long)i);
	}

	public static String resetFlagGather(String flagGather, int location) {
		return resetFlagGather(flagGather, location, '1');
	}

	public static String resetFlagGather(String flagGather, int location, char flag) {
		StringBuilder flagGatherBuilder = new StringBuilder();
		flagGatherBuilder.append(flagGather);
		flagGatherBuilder.setCharAt(location, flag);
		return flagGatherBuilder.toString();
	}

	/**
	 * 检测字符在字符串中出现的次数
	 * 
	 * @param text
	 * @param sub
	 * @return
	 */
	public static int count(String text, String sub) {
		int count = 0, start = 0;
		while ((start = text.indexOf(sub, start)) >= 0) {
			start += sub.length();
			count++;
		}
		return count;
	}
	
	/**
	 * 给报错堆栈加上uuid
	 * @param e
	 * @return
	 */
	public static String exceptionWithUuid(Throwable e, StringBuilder errorBuilder){
		String errorUuid = UUID.randomUUID().toString();
		errorBuilder.append(errorUuid).append(BaseUtils.lineSeparator).append(getStackTraceString(e));
		return errorUuid;
	}
	
	public static String getClassName(String className){
		if (className.indexOf("@") > 0) {
			className = className.substring(0, className.indexOf("@"));
		}
		return className;
	}
	
	public static String getControllerName(String className){
		className = getClassName(className);
		if (className.indexOf(".") > -1) {
			className = className.substring(className.lastIndexOf(".") + 1);
		}
		return className;
	}
	
	public static void printObject(Object object){
		System.out.println(BaseUtils.dumpAll(object));
	}
}
