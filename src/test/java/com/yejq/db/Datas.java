package com.yejq.db;

import java.math.BigDecimal;

/**
 * @author yejq
 */
public class Datas {

	private String[] customerNames;
	private String[] addresses;
	private String[] citiesStates;
	private Integer[] citiesIds;
	private Integer zip;

	private Orders[] orders;
	private States[] states;

	public String[] getCustomerNames() {
		return customerNames;
	}

	public void setCustomerNames(String[] customerNames) {
		this.customerNames = customerNames;
	}

	public String[] getAddresses() {
		return addresses;
	}

	public void setAddresses(String[] addresses) {
		this.addresses = addresses;
	}

	public String[] getCitiesStates() {
		return citiesStates;
	}

	public void setCitiesStates(String[] citiesStates) {
		this.citiesStates = citiesStates;
	}

	public Integer[] getCitiesIds() {
		return citiesIds;
	}

	public void setCitiesIds(Integer[] citiesIds) {
		this.citiesIds = citiesIds;
	}

	public Integer getZip() {
		return zip;
	}

	public void setZip(Integer zip) {
		this.zip = zip;
	}

	public Orders[] getOrders() {
		return orders;
	}

	public void setOrders(Orders[] orders) {
		this.orders = orders;
	}

	public States[] getStates() {
		return states;
	}

	public void setStates(States[] states) {
		this.states = states;
	}

}

class Orders {
	private String product;
	private BigDecimal price;
	private Integer quantity;

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
}

class States {
	private String name;
	private String abbreviation;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAbbreviation() {
		return abbreviation;
	}

	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}

}
