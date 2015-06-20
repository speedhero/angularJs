package com.yejq.test.base;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.io.Serializable;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.yejq.util.BaseUtils;
import com.yejq.util.DateUtils;

/**
 * 接口测试的抽象类
 * 
 * @author yejq
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath*:spring/spring-context.xml")
public abstract class AbstractBaseTestCase<T> {

	public static long id;
	protected SimpleDateFormat format = DateUtils.dateTimeFormatter;

	public void testSave(Object target, Object entity) {
		try {
			Method saveMethod = target.getClass().getMethod("save", Object.class);
			int i = (int) saveMethod.invoke(target, entity);
			assertTrue(i == 1);
			Method getIdMethod = entity.getClass().getMethod("getId");
			id = (long)getIdMethod.invoke(entity);
			System.out.println("id = " + id);
			assertTrue(id > 0);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void testGet(Object target, Object baseEntity) {
		try {
			assertEntity(get(target), baseEntity);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void testUpdate(Object target, Object actual) {
		try {
			Method updateMethod = target.getClass().getMethod("update", Object.class);
			int i = (int) updateMethod.invoke(target, actual);
			assertTrue(i == 1);
			Object expected = get(target);
			assertEntity(expected, actual, true);
			System.out.println("update id = " + id);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void testSaveBatch(Object target, List<T> actuals) {
		try {
			Method method = target.getClass().getMethod("saveBatch", List.class);
			method.invoke(target, actuals);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Object get(Object target) throws Exception {
		Method getMethod = target.getClass().getMethod("get", Serializable.class);
		return getMethod.invoke(target, id);
	}

	public void assertEntity(Object expected, Object actual, boolean isUpdate) throws Exception {
		assertEntity(expected, actual);
		if (isUpdate) {
			try {
				Method getLastUpdateByMethod = expected.getClass().getMethod("getLastUpdateBy");
				if (getLastUpdateByMethod != null) {
					System.out.println(getLastUpdateByMethod.getName() + ":" + getLastUpdateByMethod.invoke(expected) + ":"
							+ getLastUpdateByMethod.invoke(actual));
					assertEquals(getLastUpdateByMethod.invoke(expected), getLastUpdateByMethod.invoke(actual));
				}
				Method getLastUpdateTimeMethod = expected.getClass().getMethod("getLastUpdateTime");
				if (getLastUpdateTimeMethod != null) {
					/*System.out.println(getLastUpdateTimeMethod.getName() + ":" + getLastUpdateTimeMethod.invoke(expected)
							+ ":" + getLastUpdateTimeMethod.invoke(actual));
					assertTrue(((Date) getLastUpdateTimeMethod.invoke(expected)).getTime() < new Date().getTime());*/
				}
			} catch (Exception e) {
				System.out.println("NoSuchMethod..");
			}
		}
	}

	/**
	 * 比较两个对象
	 * 
	 * @param
	 * @return void
	 * @throws
	 */
	public void assertEntity(Object expected, Object actual) throws Exception {
		assertNotNull(expected);
		Method[] methods = expected.getClass().getMethods();
		for (Method method : methods) {
			String methodName = method.getName();
			if (!methodName.equals("getId") && !methodName.equals("getClass") && !methodName.equals("getLastUpdateBy")
					&& !methodName.equals("getLastUpdateTime") && methodName.startsWith("get") && !methodName.equals("getFlagGather")) {
				if (method.invoke(expected) != null) {
					System.out.println(methodName + ":" + method.invoke(expected) + ":" + method.invoke(actual));
					switch (method.getReturnType().getName()) {
					case "java.math.BigDecimal":
						assertTrue(((BigDecimal) method.invoke(expected)).compareTo((BigDecimal) method
								.invoke(expected)) == 0);
						break;
					case "java.util.Date":
						// assertTrue(((Date) method.invoke(expected)).getTime()
						// <= new Date().getTime());
						System.out.println("date don't assert for the present.");
						break;
					default:
						System.out.println("methodName:" + methodName);
						Object result = method.invoke(actual);
						if (result != null) {
							assertEquals(method.invoke(expected), result);
						}else {
							System.out.println("methodName:" + methodName + ", actual.invoke is null");
						}
						break;
					}
				}
			}
		}
	}
	
	public static void printObject(Object object){
		System.out.println(BaseUtils.dumpAll(object));
	}
	
	public static void printObject(Object object, Method[] methods, Format format){
		System.out.print("----" + object.getClass().getName() + "=");
		for (Method method : methods) {
			String methodName = method.getName();
			if (!methodName.equals("getClass") && methodName.startsWith("get")) {
				try {
					Object value = method.invoke(object);
					if (value != null) {
						if (value instanceof Date) {
							System.out.print(methodName + ":" + format.format(value));
						}else{
							System.out.print(methodName + ":" + value);
						}
					}
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
				System.out.print(", ");
			}
		}
		System.out.println();
	}

	@SuppressWarnings("rawtypes")
	public static void printMap(Map<String, Object> resultMap){
		if (resultMap == null) {
			System.out.println("resultMap is null!");
			return;
		}
		Iterator iterator = resultMap.keySet().iterator();
		while (iterator.hasNext()) {
			Object object = (Object) iterator.next();
			System.out.println(object + "=" + resultMap.get(object));
		}
	}
}
