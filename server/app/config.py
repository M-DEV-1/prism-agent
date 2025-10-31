from pydantic_settings import BaseSettings, SettingsConfigDict
# from pydantic import AnyUrl

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    APP_NAME: str
    ENV: str
    PORT: int
    ALLOWED_ORIGINS: str

    # Groq
    GROQ_API_KEY: str
    GROQ_MODEL: str

    # Mongo
    MONGODB_URI: str
    MONGODB_NAME: str

    # Chroma
    CHROMA_DIR: str

settings = Settings()
