package com.ohgiraffers.poppop.admin.model.dto;

public class SearchKeywordDTO {

    private String keyword;
    private int searchCount;

    public SearchKeywordDTO() {}

    public SearchKeywordDTO(String keyword, int searchCount) {
        this.keyword = keyword;
        this.searchCount = searchCount;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public int getSearchCount() {
        return searchCount;
    }

    public void setSearchCount(int searchCount) {
        this.searchCount = searchCount;
    }

    @Override
    public String toString() {
        return "SearchKeywordDTO{" +
                "keyword='" + keyword + '\'' +
                ", searchCount=" + searchCount +
                '}';
    }
}
