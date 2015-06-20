package com.yejq.util;

import java.util.List;

import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.LoggerContext;

/**
 * @author yejq
 */
public class LogBackUtils {
	
	/**
	 * 在线设置loglevel
	 * @param level
	 */
	public static void setLogLevel(Level level){
		LoggerContext lc = (LoggerContext) LoggerFactory.getILoggerFactory();
		List<Logger> loggerList = lc.getLoggerList();
		for (Logger logger : loggerList) {
			if (logger.getLevel() != null) {
				logger.setLevel(level);
				logger.info("LogBackUtils.setLogLevel,set " + logger.getName() + " to level " + level);
			}
		}
	}
}
