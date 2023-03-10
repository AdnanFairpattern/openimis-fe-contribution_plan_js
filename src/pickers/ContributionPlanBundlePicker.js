import React, { Component } from "react";
import { FormattedMessage, SelectInput } from "@openimis/fe-core";
import { fetchContributionPlanBundles } from "../actions"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class ContributionPlanBundlePicker extends Component {
    componentDidMount() {
        if (!this.props.fetching && !this.props.fetched) {
            this.props.fetchContributionPlanBundles(this.queryParams())
        }
    }

    queryParams = () => {
        const { withDeleted = false } = this.props;
        return [`isDeleted: ${withDeleted}`];
    }

    render() {
        const { contributionPlanBundles, value, onChange, required = false, withNull = false, nullLabel = null, withLabel = true, readOnly = false } = this.props;
        let options = [
            ...contributionPlanBundles.map(v => ({
                value: v,
                label: `${v.code} - ${v.name}`
            }))
        ];
        if (withNull) {
            options.unshift({
                value: null,
                label: nullLabel || <FormattedMessage module="contributionPlan" id="contributionPlan.emptyLabel" />
            })
        }
        return (
            <SelectInput
                module="contributionPlan"
                label={withLabel ? "contributionPlanBundle.label" : null}
                required={required}
                options={options}
                value={!!value ? value : null}
                onChange={onChange}
                readOnly={readOnly}
            />
        )
    }
}

const mapStateToProps = state => ({
    contributionPlanBundles: state.contributionPlan.contributionPlanBundles,
    fetching: state.contributionPlan.fetchingContributionPlanBundles,
    fetched: state.contributionPlan.fetchedContributionPlanBundles
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ fetchContributionPlanBundles }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ContributionPlanBundlePicker);
