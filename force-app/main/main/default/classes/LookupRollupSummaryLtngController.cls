public with sharing class LookupRollupSummaryLtngController {

    /*
     * List current rollup custom metadata configs
     */
    @AuraEnabled
    public static List<RollupSummary> getLookups() {
        return new RollupSummariesSelector.CustomMetadataSelector(false, false).selectAll();
	}
}
