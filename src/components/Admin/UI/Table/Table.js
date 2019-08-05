import React from 'react';
import { Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const table = ({ fields, array, limit, bordered, xs, sm, md, lg, xl, className, title, icon, dark, borderless, innerClassName, p0, select, children, selectHandler, style }) => {
    const titles = fields.map(({ name }) => <th className="align-middle" key={name}>{name}</th>);
    titles.unshift(<th className="text-center align-middle" key="#">#</th>);
    if (select) titles.unshift(<th className="align-middle text-center" key="select_all">
        <input type="checkbox" onClick={selectHandler} className="select_all" />
    </th>);
    const keys = fields.map(({ key }) => key);

    const content = array.map((item, index) => {
        if (limit && index >= limit) return null;
        let inside = [<th className="text-center align-middle" key={'primary' + index}>{index + 1}</th>];
        if (select) inside.unshift(<th className="text-center align-middle" key={'secondary' + index}>
            <input type="checkbox" value={item._id} />
        </th>);
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                const element = item[key];
                if (keys.includes(key)) inside.push(<td className="align-middle" key={key}>{element}</td>);
            }
        }

        return <tr className="align-middle" key={index + 1}>{inside}</tr>;
    });

    return (
        <Col xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
            <div className={(!p0 ? "p-3" : "p-0") + " mb-3 " + (dark ? "text-light " : "") + className} style={style}>
                <h5 className="mb-2">{icon ? <FontAwesomeIcon fixedWidth className="mr-2" icon={icon} /> : null}{title}</h5>
                {children}
                <div className="table-responsive-xl">
                    <Table dark={dark} bordered={bordered} borderless={borderless} className={innerClassName}>
                        <thead><tr>{titles}</tr></thead>
                        <tbody>{content}</tbody>
                    </Table>
                </div>
            </div>
        </Col>
    );
};

export default table;