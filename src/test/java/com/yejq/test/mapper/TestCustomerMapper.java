package com.yejq.test.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.yejq.core.mapper.CustomerMapper;
import com.yejq.core.model.Customer;
import com.yejq.test.base.AbstractBaseTestCase;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class TestCustomerMapper extends AbstractBaseTestCase<Customer> {

	public static Customer baseEntity;

	@Resource
	CustomerMapper customerMapper;

	@Test
	public void test001Save() {
		Customer entity = buildEntity();
		super.testSave(customerMapper, entity);
	}

	@Test
	public void test002Get() {
		super.testGet(customerMapper, baseEntity);
	}

	@Test
	public void test003Update() {
		Customer actual = customerMapper.get(id);
		super.testUpdate(customerMapper, buildUpdate(actual));
	}

	@Test
	public void test004SaveBatch() {
		List<Customer> actuals = new ArrayList<Customer>();
		actuals.add(buildEntity());
		actuals.add(buildEntity());
		super.testSaveBatch(customerMapper, actuals);
	}

	@Test
	public void test006CustomSelect() {
		int id = 1;
		Map<String, Object> resultMap = customerMapper.customSelect("id", "id", id);
		printMap(resultMap);
	}

	public static Customer buildUpdate(Customer actual) {
		actual.setFirstName("firstName2");
		return actual;
	}

	public static Customer buildEntity() {
		baseEntity = new Customer();
		baseEntity.setAddress("address");
		baseEntity.setCity("city");
		baseEntity.setEmail("email");
		baseEntity.setFirstName("firstName");
		baseEntity.setGender("gender");
		return baseEntity;
	}
}
