package com.yejq.base.exception;

import java.util.Collection;
import java.util.Map;

import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;

/**
 * 异常的断言，当断言不成立时，抛出异常
 */
public class ExceptionAssert {
	public static void isTrue(boolean expression, ExceptionCode code, String message) {
		isTrue(expression, code, message, null);
	}

	public static void isTrue(boolean expression, ExceptionCode code, String message,
			Object errorData) {
		if (!expression)
			throw new AppException(code, message, errorData);
	}

	public static void isNull(Object object, ExceptionCode code, String message) {
		isNull(object, code, message, null);
	}

	public static void isNull(Object object, ExceptionCode code, String message, Object errorData) {
		if (object != null)
			throw new AppException(code, message, errorData);
	}

	public static void isNotNull(Object object, ExceptionCode code, String message) {
		isNotNull(object, code, message, null);
	}

	public static void isNotNull(Object object, ExceptionCode code, String message, Object errorData) {
		if (object == null)
			throw new AppException(code, message, errorData);
	}

	public static void notNull(Object object, ExceptionCode code, String message) {
		notNull(object, code, message, null);
	}

	public static void notNull(Object object, ExceptionCode code, String message, Object errorData) {
		if (object == null)
			throw new AppException(code, message, errorData);
	}

	public static void isNotBlank(String text, ExceptionCode code, String message) {
		isNotBlank(text, code, message, null);
	}

	public static void isNotBlank(String text, ExceptionCode code, String message, Object errorData) {
		if (!org.apache.commons.lang.StringUtils.isNotBlank(text))
			throw new AppException(code, message, errorData);
	}

	public static void isNotEmpty(String text, ExceptionCode code, String message) {
		isNotEmpty(text, code, message, null);
	}

	public static void isNotEmpty(String text, ExceptionCode code, String message, Object errorData) {
		if (org.apache.commons.lang.StringUtils.isEmpty(text))
			throw new AppException(code, message, errorData);
	}

	public static void hasValue(Long value, ExceptionCode code, String message) {
		hasValue(value, code, message, null);
	}

	public static void hasValue(Long value, ExceptionCode code, String message, Object errorData) {
		if (value == null || value.equals(0L))
			throw new AppException(code, message, errorData);
	}

	public static void hasValue(Short value, ExceptionCode code, String message) {
		hasValue(value, code, message, null);
	}

	public static void hasValue(Short value, ExceptionCode code, String message, Object errorData) {
		if (value == null || value.equals(0))
			throw new AppException(code, message, errorData);
	}

	public static void hasValue(Integer value, ExceptionCode code, String message) {
		hasValue(value, code, message, null);
	}

	public static void hasValue(Integer value, ExceptionCode code, String message, Object errorData) {
		if (value == null || value.equals(0))
			throw new AppException(code, message, errorData);
	}

	public static void doesNotContain(String textToSearch, String substring, ExceptionCode code,
			String message) {
		doesNotContain(textToSearch, substring, code, message, null);
	}

	public static void doesNotContain(String textToSearch, String substring, ExceptionCode code,
			String message, Object errorData) {
		if (!org.apache.commons.lang.StringUtils.contains(textToSearch, substring))
			throw new AppException(code, message, errorData);
	}

	public static void isNotEmpty(Object[] array, ExceptionCode code, String message) {
		isNotEmpty(array, code, message, null);
	}

	public static void isNotEmpty(Object[] array, ExceptionCode code, String message,
			Object errorData) {
		if (ObjectUtils.isEmpty(array))
			throw new AppException(code, message, errorData);
	}

	public static void hasNoNullElements(Object[] array, ExceptionCode code, String message) {
		hasNoNullElements(array, code, message, null);
	}

	public static void hasNoNullElements(Object[] array, ExceptionCode code, String message,
			Object errorData) {
		if (array != null) {
			for (int i = 0; i < array.length; i++) {
				if (array[i] == null)
					throw new AppException(code, message, errorData);
			}
		}
	}

	public static void isNotEmpty(Collection<?> collection, ExceptionCode code, String message) {
		isNotEmpty(collection, code, message, null);
	}

	public static void isNotEmpty(Collection<?> collection, ExceptionCode code, String message,
			Object errorData) {
		if (CollectionUtils.isEmpty(collection))
			throw new AppException(code, message, errorData);
	}

	public static void isEmpty(Collection<?> collection, ExceptionCode code, String message) {
		if (!CollectionUtils.isEmpty(collection))
			throw new AppException(code, message, null);
	}

	public static void isEmpty(Collection<?> collection, ExceptionCode code, String message,
			Object errorData) {
		if (!CollectionUtils.isEmpty(collection))
			throw new AppException(code, message, errorData);
	}

	public static void isNotEmpty(Map<?, ?> map, ExceptionCode code, String message) {
		isNotEmpty(map, code, message, null);
	}

	public static void isNotEmpty(Map<?, ?> map, ExceptionCode code, String message,
			Object errorData) {
		if (CollectionUtils.isEmpty(map))
			throw new AppException(code, message, errorData);
	}

	public static void isInstanceOf(Class<?> type, Object obj, ExceptionCode code, String message) {
		isInstanceOf(type, obj, code, message, null);
	}

	public static void isInstanceOf(Class<?> type, Object obj, ExceptionCode code, String message,
			Object errorData) {
		notNull(type, code, message + ": type is null");
		if (!type.isInstance(obj)) {
			throw new AppException(code, message + "Object of class ["
					+ (obj != null ? obj.getClass().getName() : "null")
					+ "] must be an instance of " + type, errorData);
		}
	}

	public static void isAssignable(Class<?> superType, Class<?> subType, ExceptionCode code,
			String message) {
		isAssignable(superType, subType, code, message, null);
	}

	public static void isAssignable(Class<?> superType, Class<?> subType, ExceptionCode code,
			String message, Object errorData) {
		notNull(superType, code, message + ": superType is null");
		if (subType == null || !superType.isAssignableFrom(subType))
			throw new AppException(code, message + subType + " is not assignable to " + superType,
					errorData);
	}
}