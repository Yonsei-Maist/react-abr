/**
 * Show List and detail of uploaded Images
 * Supply croper
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.08
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import ReactApexchart from 'react-apexcharts'

class FileViewer extends Component {
	constructor(props) {
		super(props);

		this.state = {
            itemPerPage: 10,
            page: 1
        };

        this.handleDataList = this.handleDataList.bind(this);
	}

	render() {
        console.log(this.props.data)
		return (
            <div className="row">
                <div className="page-container col-md-4">
                    <table class="table">
                        <colgroup>
                            <col style={{"width": "50px"}}/>
                            <col style={{"width": "auto"}}/>
                            <col style={{"width": "200px"}}/>
                            <col style={{"width": "60px"}}/>
                        </colgroup>
                        <thead>
                            <tr>
                                <td>
                                    No.
                                </td>
                                <td>
                                    이름
                                </td>
                                <td>
                                    업로드날짜
                                </td>
                                <td>
                                    선택
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (this.props.list == undefined || this.props.list.length == 0) &&
                                <tr><td colSpan="4">There are not any contents</td></tr>
                            }
                            {
                                this.props.list.map((e, i) => {
                                    return (
                                        <tr>
                                            <td>
                                                {e.rownum}
                                            </td>
                                            <td>
                                                {e.var_name}
                                            </td>
                                            <td>
                                                {e.date_create}
                                            </td>
                                            <td>
                                                <button className="btn btn-success"
                                                    onClick={() => {
                                                        this.props.handleDataDetail(e.id_data);
                                                    }}
                                                >선택</button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.props.total / this.state.itemPerPage}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={6}
                        onPageChange={this.handleDataList}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                        />
                </div>
                <div className="col-md-8">
                    {
                        this.props.dataList.length > 0 &&
                        this.showData()
                    }
                </div>
            </div>
		)
    }
    
    componentDidMount() {
        this.props.handleDataList(this.state.page, this.state.itemPerPage)
    }

    handleDataList(page) {
        this.setState({page: page.selected + 1}, () => {
            this.props.handleDataList(this.state.page, this.state.itemPerPage)
        })
    }

    showData() {
        let dataList = this.props.dataList;
        let leftSeries = []
        let rightSeries = []
        let initMarker = 6;
        let marker = [];

        for (let i =0;i<dataList.length;i++) {
            let dataOne = dataList[i];
            let series;

            if (dataOne.char_is_right === 'Y')
                series = rightSeries;
            else
                series = leftSeries;
            
            let lineGraph = [];
            for (let x=0;x<dataOne.blob_values.length;x++)
                lineGraph.push({
                    x: x + 1,
                    y: dataOne.blob_values[x]
                });
            
            series.push({
                name: dataOne.int_decibel || dataOne.int_num,
                data: lineGraph,
                type: "line"
            })
            marker.push(0)
            if (dataOne.int_peak != null) {
                series.push({
                    name: (dataOne.int_decibel || dataOne.int_num) + "_peak",
                    data: [{ y: dataOne.blob_values[dataOne.int_peak], x: dataOne.int_peak}],
                    type: "scatter"
                });
                marker.push(initMarker);
            }
        }

        let options = {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
            },
            dataLabels: {
                enabled: false
            },
            yaxis: {
                labels: {
                    formatter: function (val) {
                        return val;
                    },
                }
            },
            xaxis: {
                type: "numeric"
            },
            markers: {
              size: marker
            },
            tooltip: {
                shared: false,
                intersect: true,
            },
            grid: {
                borderColor: '#f1f1f1',
            }
        };

        return(
            <div>
                <h4>Left</h4>
                <ReactApexchart options={options} series={leftSeries} type="line" height={350} />
                <h4>Right</h4>
                <ReactApexchart options={options} series={rightSeries} type="line" height={350} />
            </div>
        )
    }
}

FileViewer.propTypes = {
    handleDataList: PropTypes.func.isRequired,
    fileList: PropTypes.array.isRequired,
    data: PropTypes.object.isRequired
};

FileViewer.defaultProps = {
	handleDataList: () => {
		console.log("not implement")
    },
    fileList: []
};

export default FileViewer;