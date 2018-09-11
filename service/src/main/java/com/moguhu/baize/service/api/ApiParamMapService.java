package com.moguhu.baize.service.api;


import com.moguhu.baize.common.vo.PageListDto;
import com.moguhu.baize.metadata.request.api.ApiParamMapSaveRequest;
import com.moguhu.baize.metadata.request.api.ApiParamMapSearchRequest;
import com.moguhu.baize.metadata.request.api.ApiParamMapUpdateRequest;
import com.moguhu.baize.metadata.response.api.ApiParamMapResponse;

/**
 * API Param 映射 管理
 *
 * @author xuefeihu
 */
public interface ApiParamMapService {

    /**
     * 分页列表查询
     *
     * @param request
     * @return
     */
    PageListDto<ApiParamMapResponse> pageList(ApiParamMapSearchRequest request);

    /**
     * 根据ID查询
     *
     * @param mapId
     * @return
     */
    ApiParamMapResponse selectById(Long mapId);

    /**
     * 更新
     *
     * @param request
     */
    void updateById(ApiParamMapUpdateRequest request);

    /**
     * 删除
     *
     * @param mapId
     */
    void deleteById(Long mapId);

    /**
     * 新增
     *
     * @param request
     */
    void save(ApiParamMapSaveRequest request);

}
