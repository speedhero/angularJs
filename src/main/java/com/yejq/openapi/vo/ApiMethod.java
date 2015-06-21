package com.yejq.openapi.vo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class ApiMethod implements Serializable {
	private static final long serialVersionUID = 149056125227376502L;

	/** 方法名 **/
	private String name;

	/** 方法归类 **/
	private String category;

	/** 描述 **/
	private String description;

	/** http请求地址（如果支持的话） **/
	private String[] url;

	/** 方法参数 **/
	List<ApiParam> param = new ArrayList<ApiParam>();

	/** 方法返回内容 **/
	private ApiReturn apiReturn;

	/** 是否支持Http调用 **//*
	private boolean http;*/

	/** api调用方，如果方法为注明使用方，有可能被Bolck或者方法被移除 **//*
	private List<String> apiUsers;*/

	/** api作者 及 维护做 **/
	private String[] authors;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String[] getUrl() {
		return url;
	}

	public void setUrl(String[] url) {
		this.url = url;
	}

	public List<ApiParam> getParam() {
		return param;
	}

	public void setParam(List<ApiParam> param) {
		this.param = param;
	}

	public ApiReturn getApiReturn() {
		return apiReturn;
	}

	public void setApiReturn(ApiReturn apiReturn) {
		this.apiReturn = apiReturn;
	}

	/*public boolean isHttp() {
		return http;
	}

	public void setHttp(boolean http) {
		this.http = http;
	}

	public List<String> getApiUsers() {
		return apiUsers;
	}

	public void setApiUsers(List<String> apiUsers) {
		this.apiUsers = apiUsers;
	}*/

	public String[] getAuthors() {
		return authors;
	}

	public void setAuthors(String[] authors) {
		this.authors = authors;
	}

}