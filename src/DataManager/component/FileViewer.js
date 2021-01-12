/**
 * Show List and detail of uploaded Images
 * Supply croper
 * @author ChanWoo Gwon, Yonsei Univ. Researcher, since 2020.05
 * @date 2021.01.08
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import ReactApexchart from 'react-apexcharts';
import ReactRegionSelect from 'react-region-select';
import _ from 'lodash'
import $ from 'jquery'

class FileViewer extends Component {
	constructor(props) {
		super(props);

		this.state = {
            itemPerPage: 20,
            page: 1,
            imageWidth: 750,
            showRight: false
        };

        this.handleDataList = this.handleDataList.bind(this);
	}

	render() {
        console.log(this.props.dataList)
		return (
            <div className="row">
                <div className="page-container col-md-4">
                    <table class="table">
                        <colgroup>
                            <col style={{"width": "50px"}}/>
                            <col style={{"width": "auto"}}/>
                            <col style={{"width": "100px"}}/>
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
                        this.props.dataList && this.props.dataList.length > 0 &&
                        <div>
                            <h3>Origin</h3>
                            {
                                this.props.image.length > 0 &&
                                this.showSelectRegion()
                            }
                            <h3>Graphs</h3>
                            <div className="radio-inline">
                                <input className="form" type="radio" name="leftRight" id="left" checked={!this.state.showRight} onClick={(e) => {this.setState({showRight: false})}}/>
                                <label className="form" htmlFor="left">left</label>
                            </div>
                            <div className="radio-inline">
                                <input className="form" type="radio" name="leftRight" id="right" onClick={(e) => {this.setState({showRight: true})}}/>
                                <label className="form" htmlFor="right">right</label>
                            </div>
                            {
                                this.props.dataList.length > 0 &&
                                this.showData()
                            }
                        </div>
                    }
                    {
                        !this.props.dataList &&
                        <div>
                            please select item
                        </div>
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
        let dataList = _.filter(this.props.dataList, (e) => {return e.char_is_right === (this.state.showRight ? 'Y': 'N')});
        let series = []
        let initMarker = 6;
        let marker = [];

        for (let i =0;i<dataList.length;i++) {
            let dataOne = dataList[i];
            
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

        let title = this.state.showRight ? 'Right' : 'Left'

        return(
            <div>
                <h4>{title}</h4>
                <div className="row">
                    <div className="col-md-6">
                        <table className="table">
                            <thead>
                                <tr>
                                    <td>
                                        선택
                                    </td>
                                    <td>
                                        Decibel
                                    </td>
                                    <td>
                                        5V Peak
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataList.map((e, i) => {
                                        return(
                                            <tr>
                                                <td>
                                                    <input type="checkbox" name="checkValues"/>
                                                </td>
                                                <td>
                                                    {e.int_decibel || e.int_num || 0}
                                                </td>
                                                <td>
                                                    {e.int_peak || 0}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <button className="btn btn-info">합치기</button>
                    </div>
                    <div className="col-md-6">
                        <ReactApexchart options={options} series={series} type="line" height={350} width={350}/>
                    </div>
                </div>
            </div>
        )
    }

    showSelectRegion() {
        let regions = [];

        let selectOne = _.find(this.props.dataList, (e) => {return e.char_is_right === (this.state.showRight? 'Y': 'N');});

        let addRegions = (dataOne) => {
            let croped = dataOne.var_crop.split(',');
            regions.push(this.changeRegionSizeShow({
                x: parseInt(croped[0]),
                y: parseInt(croped[2]),
                width: parseInt(croped[1]) - parseInt(croped[0]),
                height: parseInt(croped[3]) - parseInt(croped[2]),
                data: dataOne
            }));
        }

        if (selectOne && selectOne.var_crop){
            addRegions(selectOne);
        }

        return (
            <ReactRegionSelect
                maxRegions={2}
                regions={regions}
                onChange={this.onChange}
                regionRenderer={this.regionRenderer}>
                    <img src={"data:;base64," + this.props.image} width={this.state.imageWidth + 'px'}/>
            </ReactRegionSelect>
        )
    }

    onChange() {

    }

    regionRenderer() {

    }

    changeRegionSizeShow(regionSize) {
        regionSize.x = regionSize.x / this.props.imageSize.width * 100;
        regionSize.width = regionSize.width / this.props.imageSize.width * 100;
        regionSize.y = regionSize.y / this.props.imageSize.height * 100;
        regionSize.height = regionSize.height / this.props.imageSize.height * 100;
        
        console.log(regionSize)
        return regionSize
    }

    changeRegionSizeToSave(regionSize) {

    }
}

FileViewer.propTypes = {
    handleDataList: PropTypes.func.isRequired,
    fileList: PropTypes.array.isRequired,
    dataList: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
    imageSize: PropTypes.object.isRequired
};

FileViewer.defaultProps = {
	handleDataList: () => {
		console.log("not implement")
    },
    fileList: []
};

export default FileViewer;