import {Metrics, MetricUnit} from "@aws-lambda-powertools/metrics";

export const setMetrics = (metricName: string, success: boolean) => {
  const metrics = new Metrics({ namespace: metricName });
  metrics.addMetric(metricName, MetricUnit.Count, 1)

  if (success) {
    metrics.addMetric(`${metricName}Success`, MetricUnit.Count, 1)
  } else {
    metrics.addMetric(`${metricName}Error`, MetricUnit.Count, 1)
  }
}