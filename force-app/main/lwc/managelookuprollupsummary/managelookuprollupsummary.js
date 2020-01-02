import { track, LightningElement } from 'lwc';
import getLookups from '@salesforce/apex/LookupRollupSummaryLtngController.getLookups'

export default class Managelookuprollupsummary extends LightningElement {

    @track lookups = []
    @track objectCount = []
    @track totals = 0
    @track active = 0
    @track inactive = 0

    loadLookups() {
        getLookups().then(res => {
            this.lookups = res

            if (res !== undefined && Array.isArray(res)) {
                this.totals = res.length
                this.active = res.reduce(el => {
                    return el.Record.Active__c === true
                }).length
                this.inactive = res.reduce(el => {
                    return el.Record.Active__c !== true
                }).length

                let m = new Map()

                res.forEach(el => {
                    if (!m.has(el.name)) {
                        m.set(el.name, 0)
                    }
                    m.set(el.name, m.get(el.name) + 1)
                })
            }
        }).catch(err => {
            if (Array.isArray(err)) {
                this.errors = err
            } else {
                this.errors = [err]
            }
        })
    }

    searchByString(evt) {
    }

    connectedCallback() {
        this.loadLookups()
    }
}