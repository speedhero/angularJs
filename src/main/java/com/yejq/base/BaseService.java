package com.yejq.base;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;

/**
 * 公共Service接口，定义常用方法
 * 
 * @author yejq
 */
public interface BaseService<T> {

	/**
	 * 保存数据，过滤空的字段
	 * 
	 * @param t 实体对象
	 * @return int
	 * @throws
	 */
	int save(T t);

	/**
	 * 根据主键更新非空的字段
	 * 
	 * @param t 实体对象
	 * @return int
	 * @throws
	 */
	int update(T t);

	/**
	 * 根据主键查询表数据
	 * 
	 * @param id 主键
	 * @return T
	 * @throws
	 */
	T get(Serializable id);

	/**
	 * 批量保存数据，过滤空的字段
	 * 
	 * @param t 实体对象集
	 * @return int
	 * @throws
	 */
	int saveBatch(List<T> ts);
	
	/**
	 * 自定义查询 例如：
	 *  1、orderShipmentMapper.customSelect("adjust_send_time","number", shipmentNumber); 
	 * 执行的语句是：select adjust_send_time from order_shipment where number = ?
	 * 
	 * 2、orderShipmentMapper.customSelect("adjust_send_time,remark", "number",shipmentNumber); 
	 * 执行的语句是：select adjust_send_time,remark from order_shipment where number = ?
	 * 
	 * @param
	 * @return HashMap<String,Object>
	 * @throws
	 */
	HashMap<String, Object> customSelect(String outColumns, String keyColumn, Object keyValue);
}
