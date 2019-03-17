import React from 'react'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../layouts/default';

const styles = {
  container: {
    alignSelf: "center",
    margin: '3rem 0'
  }
}

const NotFoundPage = props => (
  <Layout>
    <Grid container justify="center" className={props.classes.container}>
      <Grid item>
        <Typography variant="display1" gutterBottom>
          NOT FOUND
        </Typography>
        <p>This page does not exist.</p>
      </Grid>
    </Grid>
  </Layout>
)

export default withStyles(styles)(NotFoundPage)
