import { getExpediaAirportInfoByCode } from "./getAirportCode";

const expediaClick = (info, type) => {
	// date, location
	// 拆解日期
	// 解析出發目的地code
    const fromDate = splitDate( info.date.date1 );
    const toDate = splitDate( info.date.date2 );


	// 查詢code
	const from = getExpediaAirportInfoByCode(info.location.from);
	const to = getExpediaAirportInfoByCode(info.location.to);
	console.log(from, to);

	const adultNum = 1;
	const url = `https://www.expedia.com.tw/Flights-Search?flight-type=on&mode=search&trip=roundtrip&langid=1033&leg1=from:${from.city}, ${from.country} (${from.code}),to:${to.city},${to.country}(${to.code}),departure:${fromDate.year}/${fromDate.month}/${fromDate.day}TANYT&leg2=from:${to.city}, ${to.country} (${to.code}),to:${from.city}, ${from.country} (${from.code}),departure:${toDate.year}/${toDate.month}/${toDate.day}TANYT&options=cabinclass:economy&fromDate=${fromDate.year}/${fromDate.month}/${fromDate.day}&toDate=${toDate.year}/${toDate.month}/${toDate.day}&d1=${fromDate.year}-${fromDate.month}-${fromDate.day}&d2=${toDate.year}-${toDate.month}-${toDate.day}&passengers=adults:${adultNum},infantinlap:N`;
	window.open(url, "_blank");
};

const skyscannerClick = (info,type) => {
	// info.date.date1 info.date.date2
	const url = `https://www.skyscanner.com.tw/transport/flights/${info.location.from}/${info.location.to}/${info.date.date1}/${info.date.date2}/?adults=1&adultsv2=1&cabinclass=economy&children=0&childrenv2=&inboundaltsenabled=false&infants=0&outboundaltsenabled=false&preferdirects=false&ref=home&rtn=1`;
	window.open(url, "_blank");
};

const tripComClick = (info,type) => {
// https://tw.trip.com/flights/taipei-to-Vienna/tickets-tpe-vie?dcity=tpe,tpe&acity=vie,vie&ddate=2024-01-17&rdate=2024-01-20&flighttype=rt&class=y&lowpricesource=searchform&quantity=1&searchboxarg=t
    const from = getExpediaAirportInfoByCode(info.location.from);
	const to = getExpediaAirportInfoByCode(info.location.to);

    const fromDate = splitDate( info.date.date1 );
    const toDate = splitDate( info.date.date2 );

    const url = `https://tw.trip.com/flights/${from.city}-to-${to.city}/tickets-${info.location.from}-${info.location.to}?dcity=${info.location.from},${info.location.from}&acity=${info.location.to},${info.location.to}&ddate=${fromDate.year}-${fromDate.month}-${fromDate.day}&rdate=${toDate.year}-${toDate.month}-${toDate.day}&flighttype=rt&class=y&lowpricesource=searchform&quantity=1&searchboxarg=t`
    window.open(url, "_blank");
};


function splitDate( date ) {
    return {year: date.slice(0, 4), month: date.slice(4, 6), day: date.slice(6)}
}


export { expediaClick, skyscannerClick, tripComClick };