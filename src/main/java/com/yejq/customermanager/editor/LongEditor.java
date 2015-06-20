package com.yejq.customermanager.editor;

import org.springframework.beans.propertyeditors.PropertiesEditor;

public class LongEditor extends PropertiesEditor {  
    @Override  
    public void setAsText(String text) throws IllegalArgumentException {  
        if (text == null || text.equals("")) {  
            text = null;  
        }  
        setValue(Long.parseLong(text));  
    }  
  
    @Override  
    public String getAsText() {  
        return getValue().toString();  
    }  
}  
