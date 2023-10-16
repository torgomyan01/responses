import React, { useEffect, useState } from 'react';
import type { PromptsConfiguration, RateType } from './models/PromptsConfiguration';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Card, Stack } from 'react-bootstrap';
import { openAlert, setMessageAlert } from '../../redux/alert-site';
import { AlertSiteTypes } from '../../enums/enums';
import { useDispatch } from 'react-redux';

const AdminPage: React.FC = () => {
  const [configuration, setConfiguration] = useState<PromptsConfiguration | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get<PromptsConfiguration>('/api/v1/prompts/configuration/WB')
      .then((response) => {
        setConfiguration(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChangePormptTemplate = (rate: string, template: string) => {
    if (configuration) {
      const newConfiguration: PromptsConfiguration = { ...configuration };
      newConfiguration.templates.promptTemplates.rates[rate as RateType].promptTemplate = template;
      setConfiguration(newConfiguration);
    }
  };

  const handleChangeFeedbackTemplate = (rate: string, template: string) => {
    if (configuration) {
      const newConfiguration: PromptsConfiguration = { ...configuration };
      newConfiguration.templates.promptTemplates.rates[rate as RateType].feedbackTemplate =
        template;
      setConfiguration(newConfiguration);
    }
  };

  const handleChangeTemperature = (rate: string, temperature: number) => {
    if (configuration) {
      const newConfiguration: PromptsConfiguration = { ...configuration };
      newConfiguration.templates.promptTemplates.rates[rate as RateType].temperature = temperature;
      setConfiguration(newConfiguration);
    }
  };

  const handleChangeReviewStyle = (reviewStyle: string, text: string) => {
    if (configuration) {
      const newConfiguration: PromptsConfiguration = { ...configuration };
      if (reviewStyle == 'formal') {
        newConfiguration.templates.promptTemplates.placeholders.reviewStyle.formal = text;
      } else if (reviewStyle == 'friendly') {
        newConfiguration.templates.promptTemplates.placeholders.reviewStyle.friendly = text;
      }
      setConfiguration(newConfiguration);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (configuration) {
      axios
        .put('/api/v1/prompts/configuration/WB', configuration)
        .then(() => {
          //alert('Сохранено');
          dispatch(
            openAlert({
              status: AlertSiteTypes.success,
              go: true
            })
          );
          dispatch(setMessageAlert('Изменено успешно сохранено'));
        })
        .catch((error) => {
          const errorMessage = error?.response?.data?.error?.message || error.message;
          console.error(errorMessage);
          dispatch(
            openAlert({
              status: AlertSiteTypes.error,
              go: true
            })
          );
          console.log(error);
          dispatch(setMessageAlert(errorMessage));
        });
    }
  };

  return (
    configuration && (
      <Container className="m-1">
        <Form onSubmit={handleSubmit}>
          <div className="d-flex flex-wrap gap-4 mb-3">
            {Object.entries(configuration.templates.promptTemplates.rates).map(
              ([rate, rateConfig]) => (
                <div className="col-sm-5" key={rate}>
                  <Card>
                    <Card.Title className="text-center">{rate}*</Card.Title>
                    <Card.Body>
                      <div style={{ paddingBottom: '20px' }}>
                        <Form.Group>
                          <Form.Label>Temperature</Form.Label>
                          <Form.Control
                            type="text"
                            style={{ maxWidth: '100px' }}
                            defaultValue={rateConfig.temperature}
                            onChange={(e) => {
                              const inputValue = e.target.value;
                              // Проверка на валидность значения
                              if (
                                /^0*(\.\d+)?$/.test(inputValue) &&
                                parseFloat(inputValue) >= 0 &&
                                parseFloat(inputValue) <= 1
                              ) {
                                handleChangeTemperature(rate, parseFloat(inputValue));
                              }
                            }}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Prompt template</Form.Label>
                          <Form.Control
                            type="text"
                            as="textarea"
                            rows={6}
                            defaultValue={rateConfig.promptTemplate}
                            onChange={(e) => handleChangePormptTemplate(rate, e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Feedback template</Form.Label>
                          <Form.Control
                            type="text"
                            as="textarea"
                            rows={6}
                            defaultValue={rateConfig.feedbackTemplate}
                            onChange={(e) => handleChangeFeedbackTemplate(rate, e.target.value)}
                          />
                        </Form.Group>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              )
            )}
          </div>

          <div className="mb-3">
            <Card>
              <Card.Title className="text-center">Подстановка reviewStyle</Card.Title>
              <Card.Body>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Formal</Form.Label>
                      <Form.Control
                        type="text"
                        as="textarea"
                        rows={2}
                        defaultValue={
                          configuration.templates.promptTemplates.placeholders.reviewStyle.formal
                        }
                        onChange={(e) => handleChangeReviewStyle('formal', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Frienly</Form.Label>
                      <Form.Control
                        type="text"
                        as="textarea"
                        rows={2}
                        defaultValue={
                          configuration.templates.promptTemplates.placeholders.reviewStyle.friendly
                        }
                        onChange={(e) => handleChangeReviewStyle('friendly', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    )
  );
};

export default AdminPage;
