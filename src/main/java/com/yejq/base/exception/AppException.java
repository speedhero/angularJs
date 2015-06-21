package com.yejq.base.exception;

/**
 * 统一异常类
 */
public class AppException extends RuntimeException {
	private static final long serialVersionUID = 6029038041214105194L;
	
	/** 异常代码 **/
	private ExceptionCode code;
	/** 异常数据 **/
	private Object errorData;
	
	public AppException(ExceptionCode code, String message) {
		super(message);
		
		this.code = code;
	}
	
	public AppException(ExceptionCode code, String message, Object errorData) {
		super(message);
		
		this.code = code;
		this.errorData = errorData;
	}

	public ExceptionCode getCode() {
		return code;
	}

	public Object getErrorData() {
		return errorData;
	}	
}