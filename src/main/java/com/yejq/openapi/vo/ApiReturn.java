package com.yejq.openapi.vo;

import java.io.Serializable;

public class ApiReturn implements Serializable {

	private static final long serialVersionUID = -4856124769574151038L;
	private Boolean isCollection = false;
	private String CollectionClass = "";
	private String className = "";
	private Boolean isValueObject = false;

	public Boolean getIsCollection() {
		return isCollection;
	}

	public void setIsCollection(Boolean isCollection) {
		this.isCollection = isCollection;
	}

	public String getCollectionClass() {
		return CollectionClass;
	}

	public void setCollectionClass(String collectionClass) {
		CollectionClass = collectionClass;
	}

	public String getClassName() {
		return className;
	}

	public void setClassName(String className) {
		this.className = className;
	}

	public Boolean getIsValueObject() {
		return isValueObject;
	}

	public void setIsValueObject(Boolean isValueObject) {
		this.isValueObject = isValueObject;
	}

}
