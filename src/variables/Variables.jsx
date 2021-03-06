import Chartist from 'chartist';
import Tooltip from 'chartist-plugin-tooltips';

//
// //
// // // For notifications
// //
//
var defaultWidth = window.screen.width > 768 ? window.screen.width*1/3: window.screen.width;

var style = {
    Wrapper: {},
    Containers: {
        DefaultStyle: {
            position: 'fixed',
            width: defaultWidth,
            padding: '10px 10px 10px 20px',
            zIndex: 9998,
            WebkitBoxSizing: '',
            MozBoxSizing: '',
            boxSizing: '',
            height: 'auto',
            display: 'inline-block',
            border: '0',
            fontSize: '14px',
            WebkitFontSmoothing: "antialiased",
            fontFamily: '"Roboto","Helvetica Neue",Arial,sans-serif',
            fontWeight: '400',
            color: '#FFFFFF'

        },

        tl: {
            top: '0px',
            bottom: 'auto',
            left: '0px',
            right: 'auto'
        },

        tr: {
            top: '0px',
            bottom: 'auto',
            left: 'auto',
            right: '0px'
        },

        tc: {
            top: '0px',
            bottom: 'auto',
            margin: '0 auto',
            left: '50%',
            marginLeft: -(defaultWidth / 2)
        },

        bl: {
            top: 'auto',
            bottom: '0px',
            left: '0px',
            right: 'auto'
        },

        br: {
            top: 'auto',
            bottom: '0px',
            left: 'auto',
            right: '0px'
        },

        bc: {
            top: 'auto',
            bottom: '0px',
            margin: '0 auto',
            left: '50%',
            marginLeft: -(defaultWidth / 2)
        }

    },

    NotificationItem: {
        DefaultStyle: {
            position: 'relative',
            width: '100%',
            cursor: 'pointer',
            borderRadius: '4px',
            fontSize: '14px',
            margin: '10px 0 0',
            padding: '10px',
            display: 'block',
            WebkitBoxSizing: 'border-box',
            MozBoxSizing: 'border-box',
            boxSizing: 'border-box',
            opacity: 0,
            transition: 'all 0.5s ease-in-out',
            WebkitTransform: 'translate3d(0, 0, 0)',
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform, opacity',

            isHidden: {
                opacity: 0
            },

            isVisible: {
                opacity: 1
            }
        },

        success: {
            borderTop: 0,
            backgroundColor: '#a1e82c',
            WebkitBoxShadow: 0,
            MozBoxShadow: 0,
            boxShadow: 0
        },

        error: {
            borderTop: 0,
            backgroundColor: '#fc727a',
            WebkitBoxShadow: 0,
            MozBoxShadow: 0,
            boxShadow: 0
        },

        warning: {
            borderTop: 0,
            backgroundColor: '#ffbc67',
            WebkitBoxShadow: 0,
            MozBoxShadow: 0,
            boxShadow: 0
        },

        info: {
            borderTop: 0,
            backgroundColor: '#63d8f1',
            WebkitBoxShadow: 0,
            MozBoxShadow: 0,
            boxShadow: 0
        }
    },

    Title: {
        DefaultStyle: {
            fontSize: '30px',
            margin: '0',
            padding: 0,
            fontWeight: 'bold',
            color: '#FFFFFF',
            display: 'block',
            left: '15px',
            position: 'absolute',
            top: '50%',
            marginTop: '-15px'
        }

    },

    MessageWrapper: {
        DefaultStyle: {
            marginLeft: '55px',
            marginRight: '30px',
            padding: '0 12px 0 0',
            color: '#FFFFFF',
            maxWidthwidth: '89%'
        }
    },

    Dismiss: {
        DefaultStyle: {
            fontFamily: 'inherit',
            fontSize: '21px',
            color: '#000',
            float: 'right',
            position: 'absolute',
            right: '10px',
            top: '50%',
            marginTop: '-13px',
            backgroundColor: '#FFFFFF',
            display: 'block',
            borderRadius: '50%',
            opacity: '.4',
            lineHeight: '11px',
            width: '25px',
            height: '25px',
            outline: '0 !important',
            textAlign: 'center',
            padding: '6px 3px 3px 3px',
            fontWeight: '300',
            marginLeft: '65px'
        },

        success: {
            // color: '#f0f5ea',
            // backgroundColor: '#a1e82c'
        },

        error: {
            // color: '#f4e9e9',
            // backgroundColor: '#fc727a'
        },

        warning: {
            // color: '#f9f6f0',
            // backgroundColor: '#ffbc67'
        },

        info: {
            // color: '#e8f0f4',
            // backgroundColor: '#63d8f1'
        }
    },

    Action: {
        DefaultStyle: {
            background: '#ffffff',
            borderRadius: '2px',
            padding: '6px 20px',
            fontWeight: 'bold',
            margin: '10px 0 0 0',
            border: 0
        },

        success: {
            backgroundColor: '#a1e82c',
            color: '#ffffff'
        },

        error: {
            backgroundColor: '#fc727a',
            color: '#ffffff'
        },

        warning: {
            backgroundColor: '#ffbc67',
            color: '#ffffff'
        },

        info: {
            backgroundColor: '#63d8f1',
            color: '#ffffff'
        }
    },

    ActionWrapper: {
        DefaultStyle: {
            margin: 0,
            padding: 0
        }
    }
}

//
// //
// // // For icons
// //
//
const iconsArray = require('./iconsArray.json');

//
// //
// // // For tables
// //
//
var dataSets = {
    catPred: require('./ingredientCategoriesNeededPred.json'),
    ingPred: require('./ingredientsNeededPred.json'),
    itemsSold: require('./menuItemsSoldPast.json')
}

// generate data set pertaining to specified predictors
function generateTableSet(startDate, endDate, database, predictor="") {
    var predictorNames, dateData, sampleDate, header;
    var db = dataSets[database];
    var d = new Date(startDate);
    endDate = new Date(endDate);
    var thArray = [];
    var tdArray = [];

    // catch dates without correct format
    try {
        sampleDate = d.toISOString().split('T')[0];
        var sampleDate1 = endDate.toISOString().split('T')[0];
        sampleDate || sampleDate1;

        // find legend items
        if (predictor) {
            dateData = db[sampleDate][predictor];
            header = "Ingredient";
        } else {
            dateData = db[sampleDate];
            header = "Menu Item";
        }

        predictorNames = Object.keys(dateData);

        // fill header with dates
        thArray.push(header);
        for (d = new Date(startDate); d <= endDate; d.setDate(d.getDate()+1)) {
            thArray.push(d.getMonth()+1 +'/'+d.getDate().toString())
        }
        thArray.push("Total");
        
        // fill in series data
        for (var i = 0; i < predictorNames.length; i++) {
            tdArray.push([predictorNames[i]]); // initialize containers for each category
        }
        if (predictor) {
            for (d = new Date(startDate); d <= endDate; d.setDate(d.getDate()+1)) {
                for (i = 0; i < predictorNames.length; i++) {
                    tdArray[i].push(db[d.toISOString().split('T')[0]][predictor][predictorNames[i]]) 
                }
            }
        } else {
            for (d = new Date(startDate); d <= endDate; d.setDate(d.getDate()+1)) {
                for (i = 0; i < predictorNames.length; i++) {
                    tdArray[i].push(db[d.toISOString().split('T')[0]][predictorNames[i]]) 
                }
            }
        }
        // calculate totals for each row
        function add(a, b) {
            return a + b;
        }
        for (i = 0; i < predictorNames.length; i++) {
            var array = tdArray[i].slice(1, tdArray[i].length)
            tdArray[i].push(array.reduce(add, 0)); // initialize containers for each category
        }

        return [thArray, tdArray];

    } catch(error) {
        console.log("invalid date");
    }
};


//
// //
// // // // For dashboard's charts
// //
//
var today = new Date();
today = today.getMonth()+1 +'/'+today.getDate()+'/'+today.getFullYear().toString().substr(-2);
var oneWeekFromToday = new Date(today);
oneWeekFromToday.setDate(oneWeekFromToday.getDate()+7);
oneWeekFromToday = oneWeekFromToday.getMonth()+1 +'/'+oneWeekFromToday.getDate()+'/'+oneWeekFromToday.getFullYear().toString().substr(-2);
var monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// generate data set pertaining to specified predictors
function generateDataSet(startDate, endDate, database, predictor="", labels=[]) {
    var predictorNames, dateData, sampleDate;
    var db = dataSets[database];
    var d = new Date(startDate);
    endDate = new Date(endDate);
    var dataBody = {
        labels: [],
        series: []
    };
    var legend = {
        names: []
    };

    // catch dates without correct format
    try {
        sampleDate = d.toISOString().split('T')[0];
        var sampleDate1 = endDate.toISOString().split('T')[0];
        sampleDate || sampleDate1;

        // find legend items
        if (predictor) {
            dateData = db[sampleDate][predictor]
        } else {
            dateData = db[sampleDate]
        }
        predictorNames = Object.keys(dateData);
        legend.names = predictorNames;

        // initialize series containers
        for (var i = 0; i < predictorNames.length; i++) {
            dataBody["series"].push([]); // initialize containers for each category
        }

        // if no labels specified, label with date
        if (!labels || labels.length === 0) {
            for (d = new Date(startDate); d <= endDate; d.setDate(d.getDate()+1)) {
                dataBody["labels"].push(d.getMonth()+1 +'/'+d.getDate().toString())
            }
        }
        // fill in series data
        if (predictor) {
            for (d = new Date(startDate); d <= endDate; d.setDate(d.getDate()+1)) {
                for (i = 0; i < predictorNames.length; i++) {
                    var dateTooltip = d.getMonth()+1 +'/'+d.getDate().toString();
                    var date = d.toISOString().split('T')[0];
                    dataBody["series"][i].push({
                        meta: predictorNames[i],
                        value: db[date][predictor][predictorNames[i]]
                    });
                }
            }
        } else {
            for (d = new Date(startDate); d <= endDate; d.setDate(d.getDate()+1)) {
                for (i = 0; i < predictorNames.length; i++) {
                    dateTooltip = d.getMonth()+1 +'/'+d.getDate().toString();
                    date = d.toISOString().split('T')[0];
                    dataBody["series"][i].push({
                        meta: predictorNames[i] + " " + dateTooltip,
                        value: db[date][predictorNames[i]]
                    });
                }
            }
        }
        return [dataBody, legend];

    } catch(error) {
        console.log("invalid date")
    }
};

var optionsSales = {
  low: 0,
  showArea: false,
  height: "245px",
  axisX: {
    showGrid: false,
  },
  lineSmooth: true,
  showLine: true,
  showPoint: true,
  fullWidth: true,
  chartPadding: {
    right: 50
  },
  plugins: [
    Chartist.plugins.tooltip({
        appendToBody: true
    })
  ]
};

var responsiveSales = [
  ['screen and (max-width: 640px)', {
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];

// Data for Bar Chart
var dataBar = {
  labels: monthsOfYear,
  series: [
    [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]
  ]
};
var optionsBar = {
    seriesBarDistance: 10,
    axisX: {
        showGrid: false
    },
    height: "245px"
};
var responsiveBar = [
  ['screen and (max-width: 640px)', {
    seriesBarDistance: 5,
    axisX: {
      labelInterpolationFnc: function (value) {
        return value[0];
      }
    }
  }]
];
var legendBar = {
    names: ["Sales (in thousands of dollars)"],
    types: ["info","danger"]
};

// Data for Pie Chart
var dataPie = {
  labels: ["40%", "20%", "40%"],
  series: [40, 20, 40]
};
var legendPie = {
  names: ["Open", "Bounce", "Unsubscribe"],
  types: ["info", "danger", "warning"]
};


// Internal function to safely get objects
// Taken rom https://medium.com/javascript-inside/safely-accessing-deeply-nested-values-in-javascript-99bf72a0855a
var get = (p, o) =>
  p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : [], o)


export {
    style, // For notifications (App container and Notifications view)
    iconsArray, // For icons (Icons view)
    today, oneWeekFromToday, // Nicely formatted dates
    get, // To safely check if data exists

    generateDataSet, // For generating specific data sets
    generateTableSet, // For generating specific tables

    optionsSales, responsiveSales, // For charts (Dashboard view)
    dataBar, optionsBar, responsiveBar, legendBar,
    dataPie, legendPie
};
