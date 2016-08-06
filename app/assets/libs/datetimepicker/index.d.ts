interface MaterialDatapickerOptions {
	date?:boolean,
	time?:boolean,
	format?:string,
	minDate?:Date | Number,
	maxDate?:Date | Number,
	currentDate?:Date | Number,
	lang?:string,
	weekStart?:Number,
	shortTime?:boolean,
	cancelText?:string,
	okText?:string
}

interface JQuery {
	bootstrapMaterialDatePicker(options?:MaterialDatapickerOptions) : JQuery;

	setDate(date: String|Date|moment.Moment):JQuery;
	setMinDate(date: String|Date|moment.Moment): JQuery;
	setMaxDate(date: String|Date|moment.Moment): JQuery
	destroy(): JQuery;
}