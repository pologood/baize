package com.moguhu.baize.service.api;


import com.moguhu.baize.common.vo.PageListDto;
import com.moguhu.baize.metadata.request.api.ApiParamSaveRequest;
import com.moguhu.baize.metadata.request.api.ApiParamSearchRequest;
import com.moguhu.baize.metadata.request.api.ApiParamUpdateRequest;
import com.moguhu.baize.metadata.response.api.ApiParamResponse;

import java.util.List;

/**
 * API Param 管理
 *
 * Created by xuefeihu on 18/9/11.
 */
public interface ApiParamService {

    /**
     * 分页列表查询
     *
     * @param request
     * @return
     */
    PageListDto<ApiParamResponse> pageList(ApiParamSearchRequest request);

    /**
     * 根据ID查询
     *
     * @param paramId
     * @return
     */
    ApiParamResponse selectById(Long paramId);

    /**
     * 更新
     *
     * @param request
     */
    void updateById(ApiParamUpdateRequest request);

    /**
     * 删除
     *
     * @param paramId
     */
    void deleteById(Long paramId);

    /**
     * 新增
     *
     * @param request
     */
    void save(ApiParamSaveRequest request);

    /**
     * 查询列表
     * @param request
     * @return
     */
    List<ApiParamResponse> all(ApiParamSearchRequest request);
}
