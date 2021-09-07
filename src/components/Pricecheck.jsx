import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider, { CSVExport } from 'react-bootstrap-table2-toolkit';
// import overlayFactory from 'react-bootstrap-table2-overlay';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  headerTable: {
    background: '#a6a6a6',
    color: '#ffffff',
  },
}));

function Pricecheck() {
  const [userlist, setUserList] = useState([]);
  // const { ExportCSVButton } = CSVExport;
  const classes = useStyles();
  // const theme = useTheme();
  const UserExportCSV = (props) => {
    const handleExport = () => {
      props.onExport();
    };
    return (
      <div>
        <button className="btn btn-success" onClick={handleExport}>
          Export to CSV
        </button>
      </div>
    );
  };

  const columns = [
    {
      dataField: 'id',
      text: 'id',
      headerStyle: { width: '40px' },
    },
    { dataField: 'name', text: 'Name', sort: true, filter: textFilter() },
    { dataField: 'username', text: 'Username', sort: true },
    { dataField: 'email', text: 'Email', sort: true },
  ];
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
  });

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      // .get('http://localhost:3000/users')
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <ToolkitProvider
        bootstrap4
        keyField="id"
        data={userlist}
        columns={columns}
        exportCSV
      >
        {(props) => (
          <React.Fragment>
            <UserExportCSV {...props.csvProps} />
            <BootstrapTable
              striped
              hover
              condensed
              headerWrapperClasses={classes.headerTable}
              noDataIndication={
                <strong>Data is empty alias kosooong gan...</strong>
              }
              // bootstrap4
              // keyField="id"
              // columns={columns}
              // data={userlist}
              pagination={pagination}
              filter={filterFactory()}
              {...props.baseProps}
            />
          </React.Fragment>
        )}
      </ToolkitProvider>
    </div>
  );
}

export default Pricecheck;
