package com.yejq.base.exception;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.AbstractHandlerExceptionResolver;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.yejq.util.BaseUtils;

/**
 * 统一HTTP请求的异常处理
 */
@Component
public class ExceptionResolver extends AbstractHandlerExceptionResolver {
	final Logger logger = LoggerFactory.getLogger(ExceptionResolver.class);

	@Override
	protected ModelAndView doResolveException(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex) {
		logger.info(
				" In Function: ExceptionResolver.doResolveException1(request={}, response={}, handler={}, ex={})",
				new Object[] { request, response, handler, ex });
		logger.info(
				" ExceptionResolver.doResolveException2 (getAuthType={} getPathInfo={}, getRequestURL={} getRemoteUser={} getQueryString={} getMethod={} errorMessage = {} )",
				new Object[] { request.getAuthType(), request.getPathInfo(),
						request.getRequestURL(), request.getRemoteUser(), request.getQueryString(),
						request.getMethod(), ex.getMessage() });

		Map<String, Object> map = new HashMap<String, Object>();

		InetAddress inet = null;
		try {
			inet = InetAddress.getByName(request.getRemoteAddr());
		} catch (UnknownHostException e) {
			logger.info("could not get remote client ip");
		}

		if (inet != null) {
			logger.info(" ExceptionResolver.doResolveException3(requestIP={})",
					new Object[] { inet.getHostAddress() });
			map.put("clientIp", inet.getHostAddress());
		}

		if (ex instanceof AppException) {
			AppException e = ((AppException) ex);
			map.put("error", true);
			map.put("errorCode", e.getCode());
			map.put("errorMsg", e.getMessage());
			if (e.getErrorData() != null)
				map.put("errorData", e.getErrorData());
			map.put("errorDetail", BaseUtils.getStackTraceString(e));
		} else {
			map.put("error", true);
			map.put("errorCode", ExceptionCode.SYSTEM_EXCEPTION);
			map.put("errorMsg", ex.getMessage());
			String stackTraceString = BaseUtils.getStackTraceString(ex);
			map.put("errorDetail", stackTraceString);
			logger.error(stackTraceString);
		}

		return new ModelAndView(new MappingJacksonJsonView(), map);
	}
}