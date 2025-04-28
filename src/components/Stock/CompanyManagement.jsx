import React,{useState,useEffect} from "react"
import './css/StockDashBoardbottom.css'

export default function CompanyManagement({data}){
    const [officers,setOfficer] = useState([])
    const headers = ['Title','Name','Pay']
    useEffect(()=>{
          setOfficer(data.asset_profile.companyOfficers)
    },[data])

    return (
        <>
          <div className="managementTable">
            <table>
                <tr>
                   {headers.map((h) =>
                     <th>{h}</th>
                    )}
                </tr>
                
                    {officers.map((obj) =>
                     <tr>
                        <td >{obj.title}</td>
                        <td>{obj.name}</td>
                        <td>{obj.totalPay?.toLocaleString('en-us')}</td>
                    </tr>
                    )}
               
            </table>
          </div>
        </>
    )
}