import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Grid } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function InvoiceListItem({ invoice, customers, expandAll }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getCustomerName = () => {
    const customer = customers.find(
      customer => customer.id === invoice.customerId,
    );
    return customer ? customer.name : 'ERROR';
  };
  return (
    <div
      style={{
        margin: 6,
      }}
    >
      <ExpansionPanel
        expanded={expanded === 'panel1' || expandAll}
        onChange={handleChange('panel1')}
        style={{ backgroundColor: `${invoice.paid ? '#CCFFCC' : '#FFCCCC'}` }}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Grid item xs={4}>
              <Typography>{invoice.price}SAR</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.heading}>
                {moment(invoice.time).fromNow()}
              </Typography>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

const mapStateToProps = state => ({ customers: state.customers });

export default connect(mapStateToProps)(InvoiceListItem);
