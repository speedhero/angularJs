package com.yejq.openapi.annotation;

/**
 * API使用方，如果方法未写明调用方, 则很有可能被清理掉，请再APIUser中注册
 */
public enum APIUser {
	FRONT_FRONT("front", "front");
	
	private String system;
	private String module;
	
	/**
	 * @param system 使用系统，使用功能模块
	 * @param module
	 */
	private APIUser(String system, String module) {
		this.system = system;
		this.module = module;
	}
	
	@Override
	public String toString() {
		return String.format("%s module in %s system", module, system);
	}

	public String getSystem() {
		return system;
	}

	public String getModule() {
		return module;
	}
}
