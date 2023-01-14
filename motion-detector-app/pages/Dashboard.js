import Footer from "../components/Footer";
import NavbarDashboard from "../components/NavbarDashboard";
import { motion } from 'framer-motion';
import styles from "/styles/Dashboard/DashboardContent.module.css";
import Head from 'next/head';
import { useMemo, useState } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter,  useAsyncDebounce  } from 'react-table';
import { useSession, getSession } from "next-auth/react";

function Dashboard() {
  const {data:session} = useSession()

  const data = useMemo(()=>
    [
      {
        number: 1,
        image: "Image 1",
        imageContent: <img src="images/sample2.jpeg" alt="sampleimage1" />,
        dateTime: "2022-11-24 09:13:09.863682"
      },
      {
        number: 2,
        image: "Image 2",
        imageContent: "images/sample2.jpeg",
        dateTime: "2022-11-25 09:13:09.863682"
      },
      {
        number: 3,
        image: "Image 3",
        imageContent: "images/sample3.png",
        dateTime: "2022-11-26 09:13:09.863682"
      },
      {
        number: 4,
        image: "Image 4",
        dateTime: "2022-11-26 01:13:09.863682"
      },
      {
        number: 5,
        image: "Image 5",
        dateTime: "2022-11-27 03:13:09.863682"
      },
      {
        number: 6,
        image: "Image 6",
        dateTime: "2022-11-27 04:13:09.863682"
      },
      {
        number: 7,
        image: "Image 7",
        dateTime: "2022-11-27 05:13:09.863682"
      },
      {
        number: 8,
        image: "Image 8",
        dateTime: "2022-11-27 06:13:09.863682"
      },
      {
        number: 9,
        image: "Image 9",
        dateTime: "2022-11-27 07:13:09.863682"
      },
      {
        number: 10,
        image: "Image 10",
        dateTime: "2022-11-27 08:13:09.863682"
      },
      {
        number: 11,
        image: "Image 11",
        dateTime: "2022-11-27 09:13:09.863682"
      },
      {
        number: 12,
        image: "Image 12",
        dateTime: "2022-11-27 10:13:09.863682"
      },
      {
        number: 13,
        image: "Image 13",
        dateTime: "2022-11-27 11:13:09.863682"
      },
      {
        number: 14,
        image: "Image 14",
        dateTime: "2022-11-27 11:24:09.863682"
      },
      {
        number: 15,
        image: "Image 15",
        dateTime: "2022-11-27 11:32:09.863682"
      },
  
  ],[]);
  
  const columns = useMemo(() => 
    [
      {
        Header: "No.",
        accessor: "number",
      },
      {
        Header: "Image",
        accessor: "image",
      },
      {
        Header: "DateTime",
        accessor: "dateTime",
      },
    ],[]
  );
  

  const [openModal, setOpenModal] = useState(false);
  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((columns) => [
      ...columns,
      {
        id: "Action",
        Header: "Action",
        Cell: ({row}) => (
          <button className={styles.TableAction} value="Click" onClick={()=> {setOpenModal(true)+data[row.values.number-1].imageContent}}>
              View Image 
          </button>
        )
      }
    ]) 
  }
  

  function Modal({ setOpenModal,samplePhoto }) {
    return (
      <div className={styles.modalBackground}>
        <div className={styles.modalContainer}>
          <div className={styles.title}>
            <h1>Captured Photo</h1>
          </div>
          <div className={styles.body}>
            <img src="images/sample3.png" alt="sample photo" />
          </div>
          <div className={styles.footer}>
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const tableInstance = useTable({ columns, data, initialState:{pageIndex: 0}},
    tableHooks, useGlobalFilter, useSortBy, usePagination,);
  
  const { 
    getTableProps, 
    getTableBodyProps, 
    headerGroups, 
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    state: { pageIndex, pageSize },
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = tableInstance;
  
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length
    const [value, setValue] = useState(globalFilter)
    const onChange = useAsyncDebounce(value => {
      setGlobalFilter(value || undefined)
    }, 300)
  
    return (
      <span>
        Search:{' '}
        <input className={styles.searchInput}
          autoFocus="autoFocus"
          value={value || ""}
          onChange={s => {
            setValue(s.target.value);
            onChange(s.target.value);
          }}
        />
      </span>
    )
  }


  if (session) {
    return (
      <div>
        <Head>
          <title>Surveillhanz | Dashboard</title>
          <link rel="icon" href="logo/Surveillhanz.ico"/>
        </Head>
  
        <NavbarDashboard/>
        <motion.div initial="hidden" animate="visible" variants={{
          hidden:{
            scale:0.8,
            opacity:0
          },
          visible: {
            scale:1,
            opacity:1,
            transition:{
              delay:0.3
            }
  
          }
        }
        }>
        <div className={styles.container}>
       {openModal && <Modal setOpenModal={setOpenModal} />}
          <div className={styles.containerText}>
            <h1>Dashboard {session.user.name}</h1>
            <h1>{session.user.email}</h1>
          </div>
          <div className={styles.search}>
          <GlobalFilter
                        preGlobalFilteredRows={preGlobalFilteredRows}
                        globalFilter={state.globalFilter}
                        setGlobalFilter={setGlobalFilter}
                      />
          </div>
          <div className={styles.containerTable}>
            <table {...getTableProps()} className={styles.Table}>
              <thead>
                {headerGroups.map((headerGroup,) => (
                  <tr {...headerGroup.getHeaderGroupProps}>
                    {headerGroup.headers.map((column)=>(
                      <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render("Header")}
                        <span>
                                {column.isSorted
                                  ? column.isSortedDesc
                                    ? <img className={styles.logo}src="logo/arrow-down-solid.svg" alt="↔️" />
                                    :  <img className={styles.logo}src="logo/arrow-up-solid.svg" alt="↔️" />
                                  : ''}
                              </span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                  {// Loop over the rows cells
                  row.cells.map(cell => {
                    // Apply the cell props
                    return (
                      <td {...cell.getCellProps()}>
                        {// Render the cell contents
                        cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
                  )
        
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {'First'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                  {'Prev'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  {'Next'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  {'Last'}
                </button>{' '}
                <span>
                  Page{' '}
                  <strong>
                    {pageIndex + 1} of {pageOptions.length}
                  </strong>{' '}
                </span>
                <span>
                  | Go to page:{' '}
                  <input
                    autoFocus="autoFocus"
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={p => {
                      const page = p.target.value ? Number(p.target.value) - 1 : 0
                      gotoPage(page)
                    }}
                  />
                </span>{' '}
                <select
                  value={pageSize}
                  onChange={p => {
                    setPageSize(Number(p.target.value))
                  }}
                >
                  {[5, 10, 20, 50, 100].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </div>
          </div>
        {/* <DashboardContent/> */}
        </motion.div>
        <Footer/>
      </div>
    );
  }
  
  
}



export default Dashboard;


// Redirect to login page if access pages that needed session (logged in)
export async function getServerSideProps({req}) {
  const session = await getSession({req})

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { session }
  }
}