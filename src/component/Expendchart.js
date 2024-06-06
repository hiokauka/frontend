import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box'; // Import the Box component

export default function BasicPie() {
  return (
    <Box p="10%"> {/* Apply padding as a percentage of the chart size */}
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
          },
        ]}
        width={700}
        height={500}
        label={{
          fontSize: 16,
        }}
      />
    </Box>
  );
}
