package com.yejq.test.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runners.MethodSorters;

import com.yejq.core.mapper.StateMapper;
import com.yejq.core.model.State;
import com.yejq.test.base.AbstractBaseTestCase;

@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class TestStateMapper extends AbstractBaseTestCase<State> {

	public static State baseEntity;

	@Resource
	StateMapper stateMapper;

	@Test
	public void test001Save() {
		State entity = buildEntity();
		super.testSave(stateMapper, entity);
	}

	@Test
	public void test002Get() {
		super.testGet(stateMapper, baseEntity);
	}

	@Test
	public void test003Update() {
		State actual = stateMapper.get(id);
		super.testUpdate(stateMapper, buildUpdate(actual));
	}

	@Test
	public void test004SaveBatch() {
		List<State> actuals = new ArrayList<State>();
		actuals.add(buildEntity());
		actuals.add(buildEntity());
		super.testSaveBatch(stateMapper, actuals);
	}

	@Test
	public void test006CustomSelect() {
		int id = 1;
		Map<String, Object> resultMap = stateMapper.customSelect("id", "id", id);
		printMap(resultMap);
	}

	public static State buildUpdate(State actual) {
		actual.setAbbreviation("abbreviation2");
		return actual;
	}

	public static State buildEntity() {
		baseEntity = new State();
		baseEntity.setAbbreviation("abbreviation");
		baseEntity.setName("name");
		return baseEntity;
	}
}
