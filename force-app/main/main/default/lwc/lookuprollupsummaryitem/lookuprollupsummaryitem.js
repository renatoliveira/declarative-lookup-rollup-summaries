import { api, track, LightningElement } from 'lwc';

export default class Lookuprollupsummaryitem extends LightningElement {
    @api record
    @track show = false

    get activeLabel() {
        return (this.record !== undefined && this.record.Active__c)
            ? 'Active'
            : 'Inactive'
    }

    get criteriaBadge() {
        return (this.record !== undefined && this.record.RelationshipCriteria__c)
            ? 'Has criteria'
            : 'Has no criteria'
    }

    editItem(evt) {
        this.show = true
    }
}