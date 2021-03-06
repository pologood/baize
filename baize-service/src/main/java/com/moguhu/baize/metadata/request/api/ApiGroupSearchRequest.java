package com.moguhu.baize.metadata.request.api;

import com.moguhu.baize.metadata.request.BasePageRequest;

/**
 * API 分页查询请求
 * <p>
 * Created by xuefeihu on 18/9/6.
 */
public class ApiGroupSearchRequest extends BasePageRequest {

    /**
     * API分组名称.
     */
    private String name;

    /**
     * 组件ID.
     */
    private Long compId;

    /**
     * 服务ID.
     */
    private Long serviceId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getCompId() {
        return compId;
    }

    public void setCompId(Long compId) {
        this.compId = compId;
    }

    public Long getServiceId() {
        return serviceId;
    }

    public void setServiceId(Long serviceId) {
        this.serviceId = serviceId;
    }
}
