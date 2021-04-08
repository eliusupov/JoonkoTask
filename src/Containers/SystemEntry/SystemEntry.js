import React, { useState } from 'react';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { Form, Input, Checkbox, Space } from 'antd';
import cn from 'classnames';
import { downloadURI } from '../../Utils/helper';
import classes from './SystemEntry.module.scss';

const systemEntry = props => {
	const [form] = Form.useForm();
	const [changeCheckboxStyle, setChangeCheckboxStyle] = useState(false);

	const getId = async formValues => {
		try {
			const res = await axios.post('/data', formValues);
			const { data } = res;
			const { id } = data;

			return id;
		} catch (err) {}
	};

	const getFile = async id => {
		try {
			const res = await axios.get(`/file/?id=${id}`);
			const { data } = res;
			const { link } = data;
			if (link) {
				// downloadURI(link)
				window.open(link, '_blank');
			} else {
				throw new Error();
			}
		} catch (err) {
			if (err && err.response && err.response.status === 404) {
				window.location.href = 'https://joonko.co/';
			}
		}
	};

	const formSubmit = async formValues => {
		try {
			const id = await getId(formValues);

			if (id != null) {
				await getFile(id);
				form.resetFields();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className={classes.systemEntry}>
			<div className={classes.infoContainer}>
				<h2>The Future of Work in the now: Why you should Become Remote-ready</h2>
				<h3>Infographic</h3>
				<p>
					The results are in, and the verdict? Remote is here to stay. Thanks to a global pandemic companies
					have had to reevaluate the power of distributed workforces and we’ve put together all the reasons
					why going remote is the right move to make. In this infographics, you’ll see:
				</p>
				<div>
					<p>• How remote work broadens the talent pool</p>
					<p>• The productivity results behind distributed teams</p>
					<p>• An increase in diversity as a result of remote recruitment</p>
					<p>• Money saved on operational costs and salary</p>
				</div>
				<p>
					negotiations What better time to refresh your strategy than on the brink of a whole new world? Dig
					into this list of recruiting methodologies and adjust your sails for the future!
				</p>
			</div>
			<Form
				name="normal_login"
				className={classes.form}
				initialValues={{ remember: true }}
				onFinish={formSubmit}
				size="small"
			>
				<h3>Want to get the full version?</h3>
				<h4>Fill in the form below:</h4>
				<Space size="middle" direction="vertical">
					<Form.Item name="name" rules={[{ required: true, message: 'Please input your name' }]}>
						<Input placeholder="Full name" />
					</Form.Item>
					<Form.Item
						name="company_name"
						rules={[{ required: true, message: 'Please input your company name' }]}
					>
						<Input placeholder="Company name" />
					</Form.Item>
					<Form.Item name="phone" rules={[{ required: true, message: 'Please input your phone' }]}>
						<Input placeholder="Phone" type="number" />
					</Form.Item>
					<Form.Item
						name="email"
						rules={[
							{ required: true, message: 'Please input your email' },
							{ type: 'email', message: 'Invalid, please try again' },
						]}
					>
						<Input placeholder="Work email" />
					</Form.Item>
				</Space>
				<button type="submit">
					<span>Download now >></span>
				</button>
				<Form.Item
					name="isAgreementAccepted"
					valuePropName="checked"
					className={cn(changeCheckboxStyle && classes.err)}
					rules={[
						{
							required: true,
							type: 'boolean',
							transform: value => value || null,
							validator: (_, value) => {
								if (value) {
									if (changeCheckboxStyle) {
										setChangeCheckboxStyle(false);
									}
									return Promise.resolve();
								}
								if (!value) {
									setChangeCheckboxStyle(true);
									return Promise.reject('');
								}
								return Promise.reject('');
							},
						},
					]}
				>
					<Checkbox>
						<span>
							I agree to the privacy policy including for Joonko to use my contact details to contact me
							for marketing purposes.
						</span>
					</Checkbox>
				</Form.Item>
			</Form>
		</div>
	);
};

systemEntry.propTypes = {
	history: PropTypes.shape({
		location: PropTypes.shape({
			pathname: PropTypes.string,
		}),
	}).isRequired,
};

export default systemEntry;
