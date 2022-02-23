import "./App.css";
import React, { useState, useEffect } from "react";
import { data } from "./data.jsx";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
function Charts({ start, end }) {
  let initialState = {
    options: {
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        data: [],
      },
    ],
  };
  const [state1, setstate1] = useState(initialState);

  const [state2, setstate2] = useState(initialState);

  const [state3, setstate3] = useState(initialState);

  useEffect(() => {
    //  console.log("start", start);
    //  console.log("end", end);
    console.log("start date  ", data[start]);
    console.log("end date   ", data[end]);

    if (data !== null) {
      ////////////////////////////////////////////////////////////////////////         TIME SERIES

      let total = [];
      let days = [];
      let arr1 = new Map();
      arr1 = new Map();
      for (let j = start; j <= end; j++) {
        if (data[j]) {
          let k =
            data[j].arrival_date_day_of_month +
            data[j].arrival_date_month +
            data[j].arrival_date_year;
          let t = data[j].adults + data[j].children + data[j].babies;

          if (!arr1.has(k)) arr1.set(k, t);
          else {
            arr1.set(k, t + arr1.get(k));
          }
        }
      }

      days = [...arr1.keys()];
      total = [...arr1.values()];
      setstate1({
        series: [
          {
            name: "Visitors",
            data: [...arr1.values()],
          },
        ],
        options: {
          chart: {
            type: "area",
            stacked: false,
            height: 350,
            zoom: {
              type: "x",
              enabled: true,
              autoScaleYaxis: true,
            },
            toolbar: {
              autoSelected: "zoom",
            },
          },
          dataLabels: {
            enabled: false,
          },
          markers: {
            size: 0,
          },
          title: {
            text: "Visitors per day",
            align: "left",
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              inverseColors: false,
              opacityFrom: 0.5,
              opacityTo: 0,
              stops: [0, 90, 100],
            },
          },
          yaxis: {
            // labels: {
            //   formatter: function (val) {
            //     return (val / 1000000).toFixed(0);
            //   },
            // },
            title: {
              text: "Total Visitors",
            },
          },
          xaxis: {
            type: "datetime",
            categories: [...arr1.keys()],
          },
          tooltip: {
            shared: false,
            y: {
              formatter: function (val) {
                return val.toFixed(0);
              },
            },
          },
        },
      });

      /////////////////////////////////////////////////     COLUMN CHART

      let country = [];
      let visitors = [];
      let arr2 = new Map();

      for (let j = start; j <= end; j++) {
        if (
          data[j] &&
          data[j].country &&
          data[j].adults !== null &&
          data[j].children !== null &&
          data[j].babies !== null
        ) {
          arr2[country] = data[j].adults + data[j].children + data[j].babies;

          country[j] = data[j].country;
          if (
            data[j].adults !== null &&
            data[j].children !== null &&
            data[j].babies !== null
          ) {
            visitors[j] = data[j].adults + data[j].children + data[j].babies;
          } else visitors[j] = "null";
          if (!arr2.has(country[j])) arr2.set(country[j], visitors[j]);
          else {
            arr2.set(country[j], arr2.get(country[j]) + visitors[j]);
          }
        }
      }

      country = [];
      visitors = [];
      country = [...arr2.keys()];
      visitors = [...arr2.values()];

      setstate2({
        options: {
          chart: {
            id: "basic-bar",
          },

          xaxis: {
            categories: country,
            title: { text: "Country" },
          },
          yaxis: {
            title: { text: "Visitors" },
          },
        },
        series: [
          {
            name: "series-1",
            data: visitors,
          },
        ],
      });

      ////////////////////////////////////////////////////////////////////////      SPARKLINE CHART
      let adults = [];
      let children = [];
      let arr3 = new Map(); //store adults
      let arr4 = new Map(); //stores children
      for (let j = start; j <= end; j++) {
        if (data[j]) {
          let k =
            data[j].arrival_date_day_of_month +
            data[j].arrival_date_month +
            data[j].arrival_date_year;
          let a = data[j].adults;

          let c = data[j].children;

          if (!arr3.has(k)) {
            arr3.set(k, a);
            arr4.set(k, c);
          } else {
            arr3.set(k, a + arr3.get(k));
            arr4.set(k, c + arr4.get(k));
          }
        }
      }
      adults = [...arr3.values()];
      children = [...arr4.values()];
     // console.log(adults);
     // console.log(children);

      setstate3({
        series: [
          {
            name: "Adults",
            data: adults,
          },
          {
            name: "Children",
            data: children,
          },
        ],
        chart: {
          type: "area",
          height: 160,
          sparkline: {
            enabled: true,
          },
        },
        stroke: {
          curve: "straight",
        },
        fill: {
          opacity: 0.3,
        },
        yaxis: {
          min: 0,
          title:"Adults & Children"
        },
        xaxis: {
          type: "datetime",
          categories: [...arr3.keys()],
          
        },
        colors: ["#FF1654", "#DCE6EC"],
        title: {
          text: "$424,652",
          offsetX: 0,
          style: {
            fontSize: "24px",
          },
        },
        subtitle: {
          text: "Sales",
          offsetX: 0,
          style: {
            fontSize: "14px",
          },
        },
      });
    }
  }, [start, end]);

  return (
    <div className="App">
      <div className="row">
        <div className=""></div>
        <div className="mixed-chart">
          {state1 !== undefined ? (
            <div className="text-center">
              <ReactApexChart
                options={state1.options}
                series={state1.series}
                type="area"
                height={350}
                className="my-3"
              />
            </div>
          ) : null}
          {state2 !== undefined ? (
            <>
              <div className="text-center">
                <Chart
                  options={state2.options}
                  series={state2.series}
                  type="bar"
                  //width="500"
                   height={350}
                   className="my-3"
                />
              </div>
            </>
          ) : null}
          {state1 !== undefined ? (
            <div className="text-center">
              <ReactApexChart
                options={state3.options}
                series={state3.series}
                type="area"
                height={350}
                className="my-3"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Charts;
