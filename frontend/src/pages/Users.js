import React from 'react'
import {Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import Wrapper from '../component/Wrapper'
import './Dashboard.css';

const Users = ()=> {
    return (
      <Wrapper>
        <div className="table-responsive">
            <table className="table table-striped table-sm">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Header</th>
                <th scope="col">Header</th>
                <th scope="col">Header</th>
                <th scope="col">Header</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1,001</td>
                <td>random</td>
                <td>data</td>
                <td>placeholder</td>
                <td>
                    <div className="btn-group mr-2">
                        <Link to={`/admin/products/${p.id}/edit`}
                                className="btn btn-sm btn-outline-secondary">Edit</Link>
                        <a href="#" className="btn btn-sm btn-outline-secondary"
                            onClick={() => del(p.id)}
                        >Delete</a>
                    </div>
                </td>
                </tr>
                <tr>
                </tr>
            </tbody>
            </table>
        </div>
      </Wrapper>
    )
}

export default Users
