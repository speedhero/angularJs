package com.yejq.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public final class DateUtils {
	public final static SimpleDateFormat dateTimeFormatter;
	public final static SimpleDateFormat dateFormatter;
	public final static SimpleDateFormat dateFormatter4DotNet;

	public final static String dateTimePattern = "yyyy-MM-dd HH:mm:ss";
	public final static String datePattern = "yyyy-MM-dd";
	public final static String dateTimePatternUs = "EEE MMM dd HH:mm:ss z yyyy";
	public final static String dateTimePatternMonth1 = "yyyyMM";
	public final static String dateTimePatternMonth2 = "yyyy-MM";
	public final static String dateTimePatternUsStr = "CST";
	
	public final static String dateTimePattern4DotNet = "yyyy-MM-dd'T'HH:mm:ss";
	
	private static Logger log = LoggerFactory.getLogger(DateUtils.class);
	private final static String shortDatePattern = "yyMMdd";

	static {
		dateTimeFormatter = new SimpleDateFormat(dateTimePattern);
		dateFormatter = new SimpleDateFormat(datePattern);
		dateFormatter4DotNet = new SimpleDateFormat(dateTimePattern4DotNet);
	}
	
	public static String format4DotNet(Date date){
		return dateFormatter4DotNet.format(date);
	}
	
	public static String formatDate(Date date){
		return dateFormatter.format(date);
	}
	
	public static String formatDateTime(Date date){
		return dateTimeFormatter.format(date);
	}
	
	public static Date parseDate(String source){
		try {
			return dateFormatter.parse(source);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static Date parseDateTime(String source){
		try {
			return dateTimeFormatter.parse(source);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static String formatDate(Date date, String pattern){
		SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
		return dateFormat.format(date);
	}

	public static Calendar changeDate(Date thisDate, int year, int month, int day, int hour,
			int minute, int second) {
		Calendar calendar = Calendar.getInstance();
		if (thisDate != null) {
			calendar.setTime(thisDate);
		}
		calendar.add(Calendar.YEAR, year);
		calendar.add(Calendar.MONTH, month);
		calendar.add(Calendar.DATE, day);
		calendar.add(Calendar.HOUR, hour);
		calendar.add(Calendar.MINUTE, minute);
		calendar.add(Calendar.SECOND, second);
		return calendar;
	}

	public static Calendar changeDate(int year, int month, int day, int hour, int minute, int second) {
		return changeDate(null, year, month, day, hour, minute, second);
	}

	public static Date combineDateEnd(String sYear, String sMonth, String sDate) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, Integer.parseInt(sYear));
		cal.set(Calendar.MONTH, Integer.parseInt(sMonth) - 1);
		cal.set(Calendar.DATE, Integer.parseInt(sDate));
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date combineDateStart(String sYear, String sMonth, String sDate) {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, Integer.parseInt(sYear));
		cal.set(Calendar.MONTH, Integer.parseInt(sMonth) - 1);
		cal.set(Calendar.DAY_OF_MONTH, Integer.parseInt(sDate));
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date convertDateTimeToDate(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		setStartTime(cal);
		Date d = cal.getTime();
		return d;
	}

	public static final String convertDateToString(Date aDate) {
		return getDateTime(getDatePattern(), aDate);
	}

	public static final String convertDateToString(Date aDate, String datePattern) {
		return getDateTime(datePattern, aDate);
	}

	public static final String convertDateTimeToString(Date aDate) {
		return getDateTime(dateTimePattern, aDate);
	}

	public static Date convertStringToDate(String strDate) throws ParseException {
		Date aDate = null;

		try {
			if (log.isDebugEnabled()) {
				log.debug("converting date with pattern: " + getDatePattern());
			}

			aDate = convertStringToDate(getDatePattern(), strDate);
		} catch (ParseException pe) {
			log.error("Could not convert '" + strDate + "' to a date, throwing exception");
			pe.printStackTrace();
			throw new ParseException(pe.getMessage(), pe.getErrorOffset());

		}

		return aDate;
	}

	public static final Date convertStringToDate(String aMask, String strDate)
			throws ParseException {
		SimpleDateFormat df = null;
		Date date = null;
		df = new SimpleDateFormat(aMask);
		// 格式转换 2014/7/9 21:21:21 ->格式转换 2014-7-9 21:21:21
		if (strDate.indexOf("/") == 4) {
			strDate = strDate.replace("/", "-");
		}
		if (log.isDebugEnabled()) {
			log.debug("converting '" + strDate + "' to date with mask '" + aMask + "'");
		}

		try {
			date = df.parse(strDate);
		} catch (ParseException pe) {
			// log.error("ParseException: " + pe);
			throw new ParseException(pe.getMessage(), pe.getErrorOffset());
		}

		return (date);
	}

	public static final Date convertStringToDate(String aMask, String strDate, Locale locale)
			throws ParseException {
		SimpleDateFormat df = null;
		Date date = null;
		df = new SimpleDateFormat(aMask, locale);

		if (log.isDebugEnabled()) {
			log.debug("converting '" + strDate + "' to date with mask '" + aMask + "'");
		}

		try {
			date = df.parse(strDate);
		} catch (ParseException pe) {
			// log.error("ParseException: " + pe);
			throw new ParseException(pe.getMessage(), pe.getErrorOffset());
		}

		return (date);
	}

	public static String fmtTodayToFive() {
		Calendar calendar = Calendar.getInstance();
		String yy = String.valueOf(calendar.get(Calendar.YEAR) % 100);
		if (yy.length() == 1) {
			yy = "0" + yy;
		}
		String mmm = String.valueOf(calendar.get(Calendar.DAY_OF_YEAR));
		if (mmm.length() == 1) {
			mmm = "00" + mmm;
		}
		if (mmm.length() == 2) {
			mmm = "0" + mmm;
		}
		return yy + mmm;
	}

	public static Date getAddDay(Date date, int days) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DAY_OF_YEAR, days);
		Date d = cal.getTime();
		return d;
	}

	public static Calendar getCalendarOfToday() throws ParseException {
		Date today = new Date();
		SimpleDateFormat df = new SimpleDateFormat(getDatePattern());

		String todayAsString = df.format(today);
		Calendar cal = new GregorianCalendar();
		cal.setTime(convertStringToDate(todayAsString));

		return cal;
	}

	public static final String getDate(Date aDate) {
		SimpleDateFormat df = null;
		String returnValue = "";

		if (aDate != null) {
			df = new SimpleDateFormat(getDatePattern());
			returnValue = df.format(aDate);
		}

		return (returnValue);
	}

	public static final String getDate(Date aDate, String pattern) {
		SimpleDateFormat df = null;
		String returnValue = "";

		if (aDate != null) {
			df = new SimpleDateFormat(pattern);
			returnValue = df.format(aDate);
		}

		return (returnValue);
	}

	public static String getDatePattern() {
		return "MM/dd/yyyy";
	}

	public static Date StrConvertToDate(String str) {
		Date date = null;
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		try {
			date = df.parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	public static final String getDateTime(Date aDate) {
		SimpleDateFormat df = null;
		String returnValue = "";

		if (aDate != null) {
			df = new SimpleDateFormat(getDateTimePattern());
			returnValue = df.format(aDate);
		}

		return (returnValue);
	}

	public static final String getDateTime(String aMask, Date aDate) {
		SimpleDateFormat df = null;
		String returnValue = "";

		if (aDate == null) {
			log.error("aDate is null!");
		} else {
			df = new SimpleDateFormat(aMask);
			returnValue = df.format(aDate);
		}

		return (returnValue);
	}

	public static String getDateTimePattern() {
		return getDatePattern() + " HH:mm:ss";
	}

	public static Date getEndOfAllTime() {
		return getEndOfThisYear();
	}

	public static Date getEndOfLastMonth() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.add(Calendar.DATE, -1);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getEndOfLastWeek() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.WEEK_OF_YEAR, -1);
		cal.set(Calendar.DAY_OF_WEEK, 7);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getEndOfLastYear() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.DAY_OF_YEAR, 1);
		cal.add(Calendar.DATE, -1);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getEndOfNext30days() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, 30);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getEndOfNext60days() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, 60);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getEndOfNext7days() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, 7);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getEndOfNextMonth() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, 2);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.add(Calendar.DATE, -1);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getEndOfNextWeek() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.WEEK_OF_YEAR, 1);
		cal.set(Calendar.DAY_OF_WEEK, 7);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getEndOfNextYear() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.YEAR, 2);
		cal.set(Calendar.DAY_OF_YEAR, 1);
		cal.add(Calendar.DATE, -1);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getEndOfThisDay() {
		Calendar cal = Calendar.getInstance();
		setEndTime(cal);
		Date d = cal.getTime();
		return d;
	}

	public static Date getEndOfThisDay(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		setEndTime(cal);
		Date d = cal.getTime();
		return d;
	}

	public static Date getEndOfThisMonth() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, 1);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.add(Calendar.DATE, -1);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getEndOfThisMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MONTH, 1);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		cal.add(Calendar.DATE, -1);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getEndOfThisQuarter() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.MONTH, getQuarterEndMonth(cal.getTime()));
		return getEndOfThisMonth(cal.getTime());
	}

	public static Date getEndOfThisWeek() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.DAY_OF_WEEK, 7);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getEndOfThisWeek(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_WEEK, 7);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getEndOfThisYear() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.YEAR, 1);
		cal.set(Calendar.DAY_OF_YEAR, 1);
		cal.add(Calendar.DATE, -1);
		setEndTime(cal);
		return cal.getTime();
	}

	public static Date getNow() {
		return new Date();
	}

	public static String getNowStr() {
		return dateTimeFormatter.format(new Date());
	}

	public static Date getNumOfDaysBeforeNow(int days) {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DAY_OF_YEAR, -days);
		return cal.getTime();
	}

	public static int getQuarterEndMonth(Date date) {
		return getQuarterStartMonth(date) + 2;
	}

	public static int getQuarterStartMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		int startMonth = 0;
		switch (cal.get(Calendar.MONTH)) {
		case 0:
			startMonth = 0;
			break;
		case 1:
			startMonth = 0;
			break;
		case 2:
			startMonth = 0;
			break;
		case 3:
			startMonth = 3;
			break;
		case 4:
			startMonth = 3;
			break;
		case 5:
			startMonth = 3;
			break;
		case 6:
			startMonth = 6;
			break;
		case 7:
			startMonth = 6;
			break;
		case 8:
			startMonth = 6;
			break;
		case 9:
			startMonth = 9;
			break;
		case 10:
			startMonth = 9;
			break;
		case 11:
			startMonth = 9;
			break;

		default:
			break;
		}

		return startMonth;
	}

	public final static String getShortDateString() {
		SimpleDateFormat sdf = new SimpleDateFormat(shortDatePattern);
		return sdf.format(new Date());
	}

	public static Date getStartOfAllTime() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.YEAR, 2005);
		return cal.getTime();
	}

	public static Date getStartOfLast30days() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, -30);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfLast60days() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, -60);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfLast7days() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DATE, -7);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfLastMonth() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, -1);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfLastWeek() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.WEEK_OF_YEAR, -1);
		cal.set(Calendar.DAY_OF_WEEK, 1);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfLastYear() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.YEAR, -1);
		cal.set(Calendar.DAY_OF_YEAR, 1);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfNextMonth() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.MONTH, 1);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfNextWeek() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.WEEK_OF_YEAR, 1);
		cal.set(Calendar.DAY_OF_WEEK, 1);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfNextYear() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.YEAR, 1);
		cal.set(Calendar.DAY_OF_YEAR, 1);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfThisDay() {
		Calendar cal = Calendar.getInstance();
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfThisDay(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfThisMonth() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.DAY_OF_MONTH, 1);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfThisMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfThisLastMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH, -1);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfThisQuarter() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.MONTH, getQuarterStartMonth(cal.getTime()));
		return getStartOfThisMonth(cal.getTime());
	}

	public static Date getStartOfThisWeek() {
		Calendar cal = Calendar.getInstance();
		cal.set(Calendar.DAY_OF_WEEK, 1);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfThisWeek(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_WEEK, 1);
		setStartTime(cal);
		return cal.getTime();
	}

	public static Date getStartOfThisYear() {
		Calendar cal = Calendar.getInstance();
		setStartTime(cal);
		cal.set(Calendar.DAY_OF_YEAR, 1);
		return cal.getTime();
	}

	public static Date getToday() {
		return new Date();
	}

	public static Date getTomorrow() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DAY_OF_YEAR, 1);
		return cal.getTime();
	}

	public static Date getYesterday() {
		Calendar cal = Calendar.getInstance();
		cal.add(Calendar.DAY_OF_YEAR, -1);
		return cal.getTime();
	}

	private static void setEndTime(Calendar cal) {
		cal.set(Calendar.HOUR_OF_DAY, 23);
		cal.set(Calendar.MINUTE, 59);
		cal.set(Calendar.SECOND, 59);
		cal.set(Calendar.MILLISECOND, 999);
	}

	private static void setStartTime(Calendar cal) {
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
	}

	private DateUtils() {
	}

	public static int compareDate(String startDay, String endDay, int stype) {
		int n = 0;
		String formatStyle = stype == 1 ? "yyyy-MM" : "yyyy-MM-dd";

		endDay = endDay == null ? getDateTime("yyyy-MM-dd", new Date()) : endDay;

		SimpleDateFormat df = new SimpleDateFormat(formatStyle);
		Calendar c1 = Calendar.getInstance();
		Calendar c2 = Calendar.getInstance();
		try {
			c1.setTime(df.parse(startDay));
			c2.setTime(df.parse(endDay));
		} catch (Exception e3) {
			System.out.println("wrong occured");
		}
		while (!c1.after(c2)) { // 循环对比，直到相等，n 就是所要的结果
			n++;
			if (stype == 1) {
				c1.add(Calendar.MONTH, 1); // 比较月份，月份+1
			} else {
				c1.add(Calendar.DATE, 1); // 比较天数，日期+1
			}
		}
		n = n - 1;
		if (stype == 2) {
			n = (int) n / 365;
		}
		return n;
	}

	public static int dayForWeek(String pTime) throws Exception {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Calendar c = Calendar.getInstance();
		c.setTime(format.parse(pTime));
		int dayForWeek = 0;
		if (c.get(Calendar.DAY_OF_WEEK) == 1) {
			dayForWeek = 7;
		} else {
			dayForWeek = c.get(Calendar.DAY_OF_WEEK) - 1;
		}
		return dayForWeek;
	}

	public static int dayForWeek(Date pTime) throws Exception {
		Calendar c = Calendar.getInstance();
		c.setTime(pTime);
		int dayForWeek = 0;
		if (c.get(Calendar.DAY_OF_WEEK) == 1) {
			dayForWeek = 7;
		} else {
			dayForWeek = c.get(Calendar.DAY_OF_WEEK) - 1;
		}
		return dayForWeek;
	}

	public static int compareDate(Date begin, Date end) {
		String datePattern = "yyyy-MM-dd";
		String beginStr = getDate(begin, datePattern);
		String endStr = getDate(end, datePattern);
		int c = compareDate(beginStr, endStr, 0);
		return c + 1;
	}

	public static Date getAddTime(Date date, int time) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MINUTE, time);
		Date d = cal.getTime();
		return d;
	}

	public static void main(String[] args) throws Exception {
		System.out.println(DateUtils.dayForWeek("2012-09-01"));
		System.out.println(convertDateTimeToString(DateUtils.getAddDay(new Date(), -68)));
		System.out.println(DateUtils.getAddDay(new Date(), 1));
		System.out.println(new Date().getTime());
		System.out.println(convertStringToDate(dateTimePattern, "2013-09-01 00:00:00").getTime());
	}

	@SuppressWarnings("deprecation")
	public static Date getDateBeforeHour(Date date, int hour) {
		Date returnDate = date;
		returnDate.setHours(returnDate.getHours() - hour);
		return returnDate;
	}

	public static short getDateHalfInMonth(Date date) {
		short returnInt = 0;
		String monthStr = getDateTime("yyyy-MM", date);
		try {
			Date dateEnd = convertStringToDate(dateTimePattern, monthStr + "-15 23:59:59");
			if (date.compareTo(dateEnd) > 0) {
				returnInt = 2;
			} else {
				returnInt = 1;
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return returnInt;
	}

	public static Date generalConvertStringToDate(String dateString) {
		Date returnDate = null;

		// 1.时间格式 EEE MMM dd HH:mm:ss z yyyy
		if (dateString.length() > 25) {
			try {
				returnDate = DateUtils.convertStringToDate(DateUtils.dateTimePatternUs, dateString,
						Locale.US);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			return returnDate;
		}

		// 2.时间格式 2014-06-23 17:43:20.0 CST
		if (dateString.length() > 19) {
			try {
				returnDate = DateUtils.convertStringToDate(DateUtils.dateTimePattern,
						dateString.substring(0, 19));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			return returnDate;
		}

		// 3.时间格式 2014-06-23 17:43:20
		if (dateString.length() == 19) {
			try {
				returnDate = DateUtils.convertStringToDate(DateUtils.dateTimePattern, dateString);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			return returnDate;
		}

		// 4.时间格式 2014-06-23 17:43:20.0
		if (dateString.indexOf(DateUtils.dateTimePatternUsStr) == -1) {
			try {
				returnDate = DateUtils.convertStringToDate(DateUtils.dateTimePattern,
						(dateString.replace(".0", "")));
			} catch (ParseException e) {
				e.printStackTrace();
			}
		}
		return returnDate;
	}
}
