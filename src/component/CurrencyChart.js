// Chart.js
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import Title from '../dashboard/Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

// Sales 1 Data
const data1 = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00'),
];

// Sales 2 Data
const data2 = [
  createData('00:00', 0),
  createData('03:00', 100),
  createData('06:00', 200),
  createData('09:00', 400),
  createData('12:00', 800),
  createData('15:00', 1200),
  createData('18:00', 1600),
  createData('21:00', 1800),
  createData('24:00'),
];

// Sales 3 Data
const data3 = [
  createData('00:00', 0),
  createData('03:00', 50),
  createData('06:00', 100),
  createData('09:00', 200),
  createData('12:00', 400),
  createData('15:00', 600),
  createData('18:00', 800),
  createData('21:00', 1000),
  createData('24:00'),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Exchangeda</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data1}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          yAxis={[
            {
              label: 'Sales ($)',
              labelStyle: {
                ...theme.typography.body1,
                fill: theme.palette.text.primary,
              },
              tickLabelStyle: theme.typography.body2,
              max: 2500,
              tickNumber: 3,
            },
          ]}
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: theme.palette.primary.light,
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
