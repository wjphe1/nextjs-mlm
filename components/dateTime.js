export default function dateTime(str, type) {
    var d = new Date(str);
    if (d.getTime()) {
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

        const ztime = d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) 

        if (type === 'date') {
            var date = da + ' ' + mo + ' ' + ye;
        } else if (type === 'si') {
            var month = '' + (d.getMonth() + 1);
            var day = '' + d.getDate();
            var year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            var date = [year, month, day].join('-');
        } else {
            var date = da + ' ' + mo + ' ' + ye + ' ' + ztime;
        }
        

        return date;
    } else if (type === 'si') {
        return ''
    } else {
        return ' - '
    }
}