import React, { Fragment } from "react";

import { Grid, Typography } from "@mui/material";
import AnalyticEcommerce from "./analytics-ecommerce";

const Info = () => {
  return (
    <Fragment>
      <Grid container rowSpacing={4.5} columnSpacing={2.75} marginBottom={5}>
        {/* row 1 */}
        <Grid item xs={12} sx={{ mb: -2.25 }}>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Today's Incident"
            count="0"
            isSteady
            percentage={100}
            color="success"
            extra="35,000"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Staff Under Me"
            count="13"
            percentage={60}
            isLoss
            color="warning"
            extra="8,900"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Incident Logged"
            count="54"
            percentage={27.4}
            isLoss
            color="warning"
            extra="1,943"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AnalyticEcommerce
            title="Total Invoices"
            count="$13,078"
            percentage={27.4}
            color="error"
            extra="$20,395"
          />
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default Info;
