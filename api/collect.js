import request from '~/utils/request'

export default {
    getCollectList(){
        return request({
            url: '/api/edu/course-collect/auth/list',
            method: 'get',
        })
    },
    collect(courseId){
        return request({
            url: `/api/edu/course-collect/auth/collect/${courseId}`,
            method: 'Post',
        })
    }
}