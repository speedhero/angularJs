package com.yejq.test.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.yejq.core.mapper.CustomerOrderMapper;
import com.yejq.core.model.CustomerOrder;
import com.yejq.test.base.AbstractBaseTestCase;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class TestCustomerOrderMapper extends AbstractBaseTestCase<CustomerOrder> {

	public static CustomerOrder baseEntity;

	@Resource
	CustomerOrderMapper customerOrderMapper;

	@Test
	public void test001Save() {
		CustomerOrder entity = buildEntity();
		super.testSave(customerOrderMapper, entity);
	}

	@Test
	public void test002Get() {
		super.testGet(customerOrderMapper, baseEntity);
	}

	@Test
	public void test003Update() {
		CustomerOrder actual = customerOrderMapper.get(id);
		super.testUpdate(customerOrderMapper, buildUpdate(actual));
	}

	@Test
	public void test004SaveBatch() {
		List<CustomerOrder> actuals = new ArrayList<CustomerOrder>();
		actuals.add(buildEntity());
		actuals.add(buildEntity());
		super.testSaveBatch(customerOrderMapper, actuals);
	}

	@Test
	public void test006CustomSelect() {
		int id = 1;
		Map<String, Object> resultMap = customerOrderMapper.customSelect("id", "id", id);
		printMap(resultMap);
	}

	public static CustomerOrder buildUpdate(CustomerOrder actual) {
		actual.setCustomerId(2L);
		return actual;
	}

	public static CustomerOrder buildEntity() {
		baseEntity = new CustomerOrder();
		baseEntity.setCustomerId(1L);
		baseEntity.setOrderId(1L);
		return baseEntity;
	}
}
