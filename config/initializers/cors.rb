Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:5173"
    resource "/api/*",
      headers: :any,
      methods: [ :get, :post, :put, :patch, :delete, :options ]
    resource "/graphql",
      headers: :any,
      methods: [ :post, :options ]
  end
end
