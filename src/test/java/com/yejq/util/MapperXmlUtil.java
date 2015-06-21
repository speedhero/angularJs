package com.yejq.util;

import java.io.BufferedReader;
import java.io.FileReader;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Vector;

import org.junit.Before;
import org.junit.Test;

/**
 * 生成mapper.xml的辅助工具类
 * 
 * @author yejq
 */
public class MapperXmlUtil {

	private static final String CURRENT_PATH = "F:/360/workspace/CustomerManager/src/test/java/com/yejq/util/";
	public static final String FILE_INPUT = CURRENT_PATH + "in.txt";

	Map<String, String> filters = new HashMap<String, String>();
	
	@Before
	public void setUp(){
		filters.put("id", "");
	}

	/**
	 * 通过mysql的建表语句生成mapper.xml里边的inert语句
	 * 
	 * @param
	 * @return void
	 * @throws
	 */
	@Test
	public void dbToInsertSql() throws Exception {
		StringBuilder result = new StringBuilder("  <insert id=\"saveBatch\" parameterType=\"java.util.List\" >");
		result.append(NEWLINE).append("    insert into ");
		
		BufferedReader reader = new BufferedReader(new FileReader(FILE_INPUT));
		String line = "";
		Vector<KeyObject> keys = new Vector<KeyObject>();
		while ((line = reader.readLine()) != null) {
			line = line.trim();
			if (line.startsWith("CREATE")) {
				String tableName = line.substring(line.indexOf("`")+1, line.indexOf("`", line.indexOf("`")+1));
				result.append(tableName).append(" ");
			}else if (line.startsWith(ESCAPE_STRING)) {
				String keyName = line.substring(1);
				keyName = keyName.substring(0, keyName.indexOf(ESCAPE_STRING));
				if (!filters.containsKey(keyName)) {
					KeyObject keyObject = new KeyObject();
					keyObject.setKey(keyName);
					String typeString = line.substring(
							line.indexOf(keyName + ESCAPE_STRING)
									+ (keyName + ESCAPE_STRING).length()).trim();
					if (typeString.indexOf("(") > -1) {
						typeString = typeString.substring(0, typeString.indexOf("("));
					} else {
						if (typeString.indexOf(" ") > -1) {
							typeString = typeString.substring(0, typeString.indexOf(" "));
						}else {
							typeString = typeString.substring(0, typeString.indexOf(","));
						}
					}
					keyObject.setType(typeString);
					keys.add(keyObject);
				}
			}
		}
		reader.close();
		StringBuilder bracketBuffer = new StringBuilder("(");
		String sperator = ",";
		int j = 0;
		for (KeyObject keyObject : keys) {
			bracketBuffer.append(keyObject.getKey());
			if (j < keys.size() - 1) {
				bracketBuffer.append(sperator).append(" ");
			}
			j++;
		}
		bracketBuffer.append(")");

		StringBuilder chooseBuffer = new StringBuilder("");
		j = 0;
		String pattern = CHOOSE_FORMAT_STRING;
		for (KeyObject keyObject : keys) {
			switch (keyObject.getType()) {
			case "int":
				pattern = CHOOSE_FORMAT_INT;
				break;
			case "tinyint":
				pattern = CHOOSE_FORMAT_INT;
				break;
			case "timestamp":
				pattern = CHOOSE_FORMAT_TIME_DEFAULT;
				break;
			case "decimal":
				pattern = CHOOSE_FORMAT_DECIMAL;
				break;
			default:
				pattern = CHOOSE_FORMAT_STRING;
				break;
			}
			if ("create_time".equals(keyObject.getKey())) {
				pattern = CHOOSE_FORMAT_TIME_NOW;
			}
			String javaString = chgDBColumnToJavaProperty(keyObject.getKey());
			chooseBuffer.append(MessageFormat.format(pattern, javaString, javaString));
			chooseBuffer.append(NEWLINE);
		}
		result.append(bracketBuffer).append(" values").append(NEWLINE);
		result.append("    <foreach collection=\"list\" item=\"item\" index=\"index\" separator=\",\">").append(NEWLINE);
		result.append("      <trim prefix=\"(\" suffix=\")\" suffixOverrides=\",\">").append(NEWLINE);
		result.append(chooseBuffer);
		result.append("      </trim>").append(NEWLINE);
		result.append("    </foreach>").append(NEWLINE);
		result.append("  </insert>");
		
		System.out.println(result);

	}

	private String chgDBColumnToJavaProperty(String columnName) {
		String[] columnNames = columnName.split("_");
		String javaProperty = columnNames[0];
		for (int i = 1; i < columnNames.length; i++) {
			javaProperty += columnNames[i].substring(0, 1).toUpperCase()
					+ columnNames[i].substring(1);
		}
		return javaProperty;
	}

	public static final String ESCAPE_STRING = "`";
	public static final String NEWLINE = System.getProperty("line.separator");

	public static final String CHOOSE_FORMAT_STRING = "        <choose>" + NEWLINE
			+ "          <when test=\"item.{0} == null\">'''',</when>" + NEWLINE
			+ "          <otherwise>#'{'item.{1}'}',</otherwise>" + NEWLINE + "        </choose>";
	public static final String CHOOSE_FORMAT_INT = "        <choose>" + NEWLINE
			+ "          <when test=\"item.{0} == null\">0,</when>" + NEWLINE
			+ "          <otherwise>#'{'item.{1}'}',</otherwise>" + NEWLINE + "        </choose>";
	public static final String CHOOSE_FORMAT_TIME_DEFAULT = "        <choose>" + NEWLINE
			+ "          <when test=\"item.{0} == null\">'0000-00-00 00:00:00',</when>" + NEWLINE
			+ "          <otherwise>#'{'item.{1}'}',</otherwise>" + NEWLINE + "        </choose>";
	public static final String CHOOSE_FORMAT_TIME_NOW = "        <choose>" + NEWLINE
			+ "          <when test=\"item.{0} == null\">now(),</when>" + NEWLINE
			+ "          <otherwise>#'{'item.{1}'}',</otherwise>" + NEWLINE + "        </choose>";
	public static final String CHOOSE_FORMAT_DECIMAL = "        <choose>" + NEWLINE
			+ "          <when test=\"item.{0} == null\">0.0000,</when>" + NEWLINE
			+ "          <otherwise>#'{'item.{1}'}',</otherwise>" + NEWLINE + "        </choose>";
}

class KeyObject {
	private String key;
	private String type;

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
