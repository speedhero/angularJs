package com.yejq.base;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;

public class BaseQuery {

	private PageBounds pageBounds;

	public PageBounds getPageBounds() {
		return pageBounds;
	}

	public void setPageBounds(PageBounds pageBounds) {
		this.pageBounds = pageBounds;
	}

}
