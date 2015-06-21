package com.yejq.test.mapper;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.yejq.core.mapper.OrderMapper;
import com.yejq.core.model.Order;
import com.yejq.test.base.AbstractBaseTestCase;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class TestOrderMapper extends AbstractBaseTestCase<Order> {

	public static Order baseEntity;

	@Resource
	OrderMapper orderMapper;

	@Test
	public void test001Save() {
		Order entity = buildEntity();
		super.testSave(orderMapper, entity);
	}

	@Test
	public void test002Get() {
		super.testGet(orderMapper, baseEntity);
	}

	@Test
	public void test003Update() {
		Order actual = orderMapper.get(id);
		super.testUpdate(orderMapper, buildUpdate(actual));
	}

	@Test
	public void test004SaveBatch() {
		List<Order> actuals = new ArrayList<Order>();
		actuals.add(buildEntity());
		actuals.add(buildEntity());
		super.testSaveBatch(orderMapper, actuals);
	}

	@Test
	public void test006CustomSelect() {
		int id = 1;
		Map<String, Object> resultMap = orderMapper.customSelect("id", "id", id);
		printMap(resultMap);
	}

	public static Order buildUpdate(Order actual) {
		actual.setPrice(new BigDecimal(20.1));
		return actual;
	}

	public static Order buildEntity() {
		baseEntity = new Order();
		baseEntity.setPrice(new BigDecimal(10.11));
		baseEntity.setProduct("product");
		baseEntity.setQuantity(2);
		return baseEntity;
	}
}
