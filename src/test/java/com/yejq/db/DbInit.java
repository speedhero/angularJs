package com.yejq.db;

import java.io.File;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.yejq.core.mapper.CustomerMapper;
import com.yejq.core.mapper.CustomerOrderMapper;
import com.yejq.core.mapper.OrderMapper;
import com.yejq.core.mapper.StateMapper;
import com.yejq.core.model.Customer;
import com.yejq.core.model.CustomerOrder;
import com.yejq.core.model.Order;
import com.yejq.core.model.State;
import com.yejq.util.DateUtils;

/**
 * 数据初始化
 * @author yejq
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("classpath*:spring/spring-context.xml")
public class DbInit{
	
	@Resource
	private StateMapper stateMapper;
	@Resource
	private CustomerMapper customerMapper;
	@Resource
	private CustomerOrderMapper customerOrderMapper;
	@Resource
	private OrderMapper orderMapper;

	@Test
	public void init() throws Exception{
		ObjectMapper objectMapper = new ObjectMapper();
		Datas datas = objectMapper.readValue(new File("src/test/java/com/yejq/db/data.json"), Datas.class);
		
		States[] statesData = datas.getStates();
		List<Long> stateIds = Lists.newArrayList();
		for (States data : statesData) {
			State state = new State();
			state.setAbbreviation(data.getAbbreviation());
			state.setName(data.getName());
			stateMapper.save(state);
			stateIds.add(state.getId());
		}
		
		String[] customerNames = datas.getCustomerNames();
		String[] addresses = datas.getAddresses();
		String[] citiesStates = datas.getCitiesStates();
		Integer zip = datas.getZip();
		List<Long> customersIds = Lists.newArrayList();
		for (int i = 0; i < customerNames.length; i++) {
			String data = customerNames[i];
			String[] nameGenderHost = data.split(",");
			Customer customer = new Customer();
			customer.setFirstName(nameGenderHost[0]);
			customer.setLastName(nameGenderHost[1]);
			customer.setEmail(nameGenderHost[0] + "." + nameGenderHost[1] + "@" + nameGenderHost[3]);
			customer.setAddress(addresses[i]);
			
			String[] citiesState = citiesStates[i].split(",");
			customer.setCity(citiesState[0]);
			int n = (int)(Math.random() * stateIds.size());
			customer.setStateId(stateIds.get(n));
			customer.setZip(zip + i + "");
			customer.setGender(nameGenderHost[2]);
			customerMapper.save(customer);
			customersIds.add(customer.getId());
		}
		
		Orders[] orders = datas.getOrders();
		List<Long> orderIds = Lists.newArrayList();
		for (int i = 0; i < orders.length; i++) {
			Orders data = orders[i];
			Order order = new Order();
			order.setPrice(data.getPrice());
			order.setProduct(data.getProduct());
			order.setQuantity(data.getQuantity());
			int n = -(int)(Math.random() * 10);
			order.setOrderDate(DateUtils.getAddDay(new Date(), n));
			orderMapper.save(order);
			orderIds.add(order.getId());
		}
		
		for (int i = 0; i < customersIds.size(); i++) {
			Long customerId = customersIds.get(i);
			int n = (int)(Math.random() * (orderIds.size() - 2)) + 1;
			for (int j = 0; j < n; j++) {
				int x = (int)(Math.random() * orderIds.size());
				CustomerOrder customerOrder = new CustomerOrder();
				customerOrder.setCustomerId(customerId);
				customerOrder.setOrderId(orderIds.get(x));
				customerOrderMapper.save(customerOrder);
			}
		}
		
	}
}
