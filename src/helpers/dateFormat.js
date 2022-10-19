import moment from 'moment/moment';

export const  getFormatDate = (date) => moment(new Date(date)).format('MMMM Do YYYY, h:mm:ss a'); 