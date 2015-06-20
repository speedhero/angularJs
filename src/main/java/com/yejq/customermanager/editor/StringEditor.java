package com.yejq.customermanager.editor;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.propertyeditors.PropertiesEditor;

public class StringEditor extends PropertiesEditor {
	@Override
	public void setAsText(String text) throws IllegalArgumentException {
		if (StringUtils.isBlank(text)) {
			text = null;
		} else {
			text = text.trim();
		}
		setValue(text);
	}

	@Override
	public String getAsText() {
		return getValue().toString();
	}
}
